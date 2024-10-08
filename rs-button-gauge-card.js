
import {LitElement, html, css, unsafeCSS} from 'https://unpkg.com/lit-element@3.1.2/lit-element.js?module';
import {unsafeHTML} from 'https://unpkg.com/lit-html@3.1.2/directives/unsafe-html.js';
// DonutChart component
class DonutChart extends LitElement {
    static properties = {
        value: {type: Number},
        size: {type: Number},
        strokeWidth: {type: Number},
        backcolor: {type: String},
        color: {type: String}
    };
    render() {
        const radius = (this.size - this.strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (this.value / 100) * circumference;
        return html`
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="${this.size / 2}"
            cy="${this.size / 2}"
            r="${radius}"
            stroke="${this.backcolor}"
            stroke-width="${this.strokeWidth}"
            fill="transparent"
          />
          <circle
            cx="${this.size / 2}"
            cy="${this.size / 2}"
            r="${radius}"
            stroke="${this.color}"
            stroke-width="${this.strokeWidth}"
            fill="transparent"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
            stroke-linecap="round"
            style="transition: stroke-dashoffset 0.35s;"
            transform="rotate(-90 ${this.size / 2} ${this.size / 2})"  <!-- Rotatie toegepast -->
          />
        </svg>`;
    }

    static styles = css`
    svg {
      display: grid;
      margin: 0 auto;
    }`;
}
customElements.define('donut-chart', DonutChart);


class RSGaugeCard extends LitElement {
    static get properties() {
        return {
            hass: {},
            _config: {},
            containerSize: {type: Number}
        };
    }

    setConfig(config) {
        this._config = config;
    }

    constructor() {
        super();
        this.containerSize = 150;
    }

    firstUpdated() {
        const container = this.shadowRoot.getElementById("card");

        if (container) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    const captionHeight = this.shadowRoot.getElementById("caption").offsetHeight;
                    if (container.offsetWidth < container.offsetHeight) {
                        this.containerSize = container.offsetWidth - 10 - (captionHeight * 1);
                    } else {
                        this.containerSize = container.offsetHeight - 10 - (captionHeight * 3);
                    }
                }
            });
            resizeObserver.observe(container);
            this.requestUpdate();
        }
    }

    _titleBox() {
        var legend = '';
        if (this._config.show_donut && this._config.show_donut !== false) {
            legend = `min: ${this._config.min} - max: ${this._config.max}`;
        }
        if (this._config.show_diagram && this._config.show_diagram !== false) {
            legend = `min: ${this._config.min} - max: ${this._config.max}`;
        }
        const info = (this._config.show_info) ? `${window.innerWidth}w x${window.innerHeight}h` : '';
        const title = this._config.title || "&nbsp;";
        return `<td id="title" class="container" valign='middle' colspan=2>
                ${info} ${title} ${legend}
                </td>`;
    }

    _iconBox() {
        var iconcontainerid = '';
        if (this._config.show_donut && this._config.show_donut !== false) {
            iconcontainerid = 'donut-icon-container';
        }
        if (this._config.show_diagram && this._config.show_diagram !== false) {
            iconcontainerid = 'diagram-icon-container';
        }

        const name = this._config.name || "";
        const iconname = (this._config.show_donut && this._config.show_donut !== false)
                ? `<div id="iconname" class="name">${name} ${this._value().toPrecision()}${this._config.measurement}</div>`
                : '';

        const buttonColor = this._currentSwitchState().color || this._config.color || "gray";
        const icon = this._currentSwitchState().icon || this._config.icon || "mdi:power";
        const onoroff = this.hass.states[this._config.entity].state === 'on' ? 'on' : 'off';

        return (this._config.show_button && this._config.show_button !== false)
                ? `<td id="${iconcontainerid}" class="container" valign='middle'>
                   <button style="color: ${buttonColor}">
                   <ha-icon class="${onoroff}" icon="${icon}">
                   </ha-icon>
                   </button>${iconname}</td>`
                : '';
    }

    _diagramBox() {
        const miniicon = this._config.miniicon || "mdi:arrow-right-box";
        const onepercent = ((this._config.max - this._config.min) / 100);
        const value = (this._value() - this._config.min) / onepercent;
        const name = this._config.name || "";
        return (this._config.show_diagram && this._config.show_diagram !== false)
                ? `<td id="right-container" class="container">
                   <div id="explanations" class="explanations">
                   <div id="name" class="name"><ha-icon icon="${miniicon}" style="--mdc-icon-size: 32px;"></ha-icon>${name}</div>
                   <div id="value" class="value">${this._value().toPrecision()}</div>
                   <div id="measurement" class="measurement">${this._config.measurement}</div>        
                   </div>
                   <div id="body" class="body">
                   <div id="graphic" class="flex-container">
                   <div id="tube" class="tube">
                   <div id="slider" class="slider" style="width:${value}% !important;">&nbsp;
                   </div>
                   </div>
                   </div>
                   <div id="markers">
                   <div id="minmark" class="minmark">&nbsp;${this._config.min}&nbsp;</div>
                   <div id="maxmark" class="maxmark">&nbsp;${this._config.max}&nbsp;</div>
                   </div>
                   </div>             
                   </td>`
                : '';
    }

    _donutBox() {
        const onepercent = ((this._config.max - this._config.min) / 100);
        const value = (this._value() - this._config.min) / onepercent;
        return (this._config.show_donut && this._config.show_donut !== false)
                ? `<td id="right-container" class="container">
                   <donut-chart value="${value}"
                    size="${this._config.donut_size || this.containerSize || '150'}"
                    strokeWidth="${this._config.donut_strokewidth || '14'}"
                    color="${this._config.donut_color || 'lightgreen'}"
                    backcolor="${this._config.donut_backcolor || 'darkgreen'}">
                   </donut-chart>
                   </td>`
                : '';
    }

    _captionBox() {
        const caption = this._currentSwitchState().caption || this._config.caption || "";

        return (this._config.show_caption && this._config.show_caption !== false)
                ? `<td id="caption" colspan=2 nowrap>
                   ${caption}
                   </td>`
                : '';
    }

    _value() {
        return 1 * `${this.hass.states[this._config.sensor].state}`;
    }

    _currentSwitchState() {
        return this._config.state.find(s => s.value === this.hass.states[this._config.entity].state) || {};
    }

    render() {
        if (!this.hass || !this._config) {
            return html``;
        }
        if (!this.hass.states[this._config.sensor]) {
            return html` <ha-card>Unknown sensor: ${this._config.sensor}</ha-card> `;
        }
        if (!this.hass.states[this._config.entity]) {
            return html` <ha-card>Unknown entity: ${this._config.entity}</ha-card> `;
        }

        return html `
            <ha-card>                    
                <div id="card" @click=${this.buttonClicked}>        
                    <table id="container" cellspacing=0 cellpadding=0 style='width: 100%; height: 100%;'>
                        <tbody>
                            <tr id="top-container">
                                ${unsafeHTML(this._titleBox())}                        
                            </tr>
                            <tr id="mid-container">
                                ${unsafeHTML(this._iconBox())}
                                ${unsafeHTML(this._donutBox())}
                                ${unsafeHTML(this._diagramBox())}
                            </tr>
                            <tr id="bottom-container">
                                ${unsafeHTML(this._captionBox())}
                            </tr>
                        </tbody>
                    </table>        
                </div>
                <style>
                    ${this._config.styles ? unsafeCSS(this._config.styles) : ''}
                </style>         
            </ha-card>`;
    }

    buttonClicked() {
        const stateObj = this.hass.states[this._config.entity];
        const entityId = this._config.entity;
        const [domain] = this._config.entity.split('.');
        let service;

        const tapAction = this._config.tap_action || {};

        if (tapAction.action === "fire-dom-event") {
            const eventData = {
                browser_mod: tapAction.browser_mod || {}
            };
            this.fireDomEvent(eventData);

        } else if (tapAction.action === "call-service" && tapAction.service === "browser_mod.popup") {
            this.hass.callService("browser_mod", "popup", tapAction.service_data);
        } else if (tapAction.action === "call-service" && tapAction.service) {
            this.hass.callService(tapAction.domain || domain, tapAction.service, tapAction.service_data || {entity_id: entityId});
        } else {

            switch (domain) {
                case "input_button":
                    service = "press";
                    break;
                case "cover":
                    service = this._config.service;
                    break;
                case "scene":
                    service = this._config.service || "turn_on";
                    break;
                case "automation":
                    service = this._config.service || "trigger";
                    break;
                case "script":
                    service = this._config.service || "turn_on";
                    break;
                case "media_player":
                    service = this._config.service || "toggle";
                    break;
                default:
                    service = stateObj.state === "on" ? "turn_off" : "turn_on";
                    break;
            }

            this.hass.callService(domain, service, {entity_id: entityId});
        }
    }

    fireDomEvent(eventData) {
        const event = new Event("ll-custom", {
            bubbles: true,
            cancelable: false,
            composed: true,
        });
        event.detail = eventData;

        this.dispatchEvent(event);
    }

    static styles = css`
        #card {
            width: 100%;
            height: calc(100% - 10px);
            padding: 0px;
            margin: 0px;
            margin-top: -5px;
            cursor: pointer;
        }

        #main {
            width: 100%;
            display: grid;
        }

        #container {
            width: 100%;
            padding: 0px;
        }

        tr#top-container {
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: auto;
            width: 100%;
            vertical-align: center;
            text-align: center;
        }

        tr#mid-container {
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: 100%;
            width: auto;
            vertical-align: center;
            text-align: center;
        }
                                
        tr#bottom-container {
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: auto;
            width: 100%;
            vertical-align: center;
            text-align: center;
        }

        td#icon-container {
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: 100%;
            width: 100%;
            vertical-align: center;
            text-align: center;
        }

        td#donut-icon-container {
            position: absolute;
            top: calc(50% - (calc(25vw / 6)) / 2);
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: 100%;
            width: 100%;
            vertical-align: center;
            text-align: center;
        }
                                
        td#diagram-icon-container {
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: 100%;            
            vertical-align: center;
            text-align: center;
        }

        #right-container {
            border: 0px solid transparent;
            margin: 0px;
            padding: 0px;
            borderradius: 0px;
            height: 100%;
            width: 100%;
        }

        td#caption {
            height: 20px;
            margin: 0px;
            padding: 0px;
        }

        button {
            align-items: center;
            padding: 0px;
            background-color: transparent;
            color: white;
            cursor: pointer;
            border: none;
        }

        #caption {
            font-size: 17.5px;
            text-align: center;
            width: 100%;
        }

        ha-icon {
            --mdc-icon-size: calc(25vw / 6);
        }

        #body {
            border: 0px solid transparent;
            width: 100%;
            display: grid;
        }

        div.tube {
            background-color: darkgreen;
            border-radius: 8px;
            width: 100%;
            height: 16px;
        }

        div.slider {
            background-color: lightgreen;
            border-radius: 8px;
            height: 16px;
            font-size: 1px;
        }

        #explanations {
            display: flex;
        }

        #name {
            font-size: 17.5px;
            font-weight: normal;
            color: black;
            width: 50%;
            display: flex;
        }

        #value {
            font-size: 17.5px;
            font-weight: normal;
            color: black;
            text-align: right;
            width: 50%;
        }

        #measurement {
            font-size: 17.5px;
            font-weight: normal;
            color: black;
            text-align: right;
        }

        #markers {
            display: flex;
        }

        #minmark {
            padding-top: 0px;
            font-size: 14px;
            font-weight: normal;
            color: white;
            width: 50%;
            text-align: left;
        }

        #maxmark {
            padding-top: 0px;
            font-size: 14px;
            font-weight: normal;
            color: white;
            width: 50%;
            text-align: right;
        }

        #title {
            padding: 5px;
            font-size: 17.5px;
            font-weight: normal;
            color: black;
            text-align: center;
            white-space: nowrap;
        }

        #caption {
            font-size: 17.5px;
            font-weight: normal;
            color: black;
            text-align: center;
            white-space: nowrap;
        }

        /* iPhone 12 en vergelijkbare apparaten */
        @media (min-width: 390px) and (max-width: 414px) {
            ha-icon {
                --mdc-icon-size: calc(30vw / 2.5);
            }

            #title {                
                font-size: 10px;
                font-weight: normal;
                color: black;
                text-align: center;
                white-space: nowrap;
            }

            #caption {
                font-size: 10px;
                font-weight: normal;
                color: black;
                text-align: center;
                white-space: nowrap;
            }

            #name {
                font-size: 10px;
                font-weight: normal;
                color: black;
                width: 50%;
                display: flex;
            }

            #value {
                font-size: 10px;
                font-weight: normal;
                color: black;
                text-align: right;
                width: 50%;
            }

            #measurement {
                font-size: 10px;
                font-weight: normal;
                color: black;
                text-align: right;
            }

            #minmark {
                display: none;
                padding-top: 0px;
                font-size: 10px;
                font-weight: normal;
                color: white;
                width: 50%;
                text-align: left;
            }

            #maxmark {
                display: none;
                padding-top: 0px;
                font-size: 10px;
                font-weight: normal;
                color: white;
                width: 50%;
                text-align: right;
            }
        }
                                
        /* iPad Mini en vergelijkbare apparaten */
        @media (min-width: 900px) and (max-width: 1200px) {
            ha-icon {
                --mdc-icon-size: calc(25vw / 6);
            }
                                
            tr#bottom-container {
                border: 0px solid transparent;
                margin: 0px;
                margin-bottom: 20px;
                padding: 0px;
                padding-bottom: 0px;
                borderradius: 0px;
                height: auto;
                width: 100%;
                vertical-align: center;
                text-align: center;
            }                                

            #title {                
                font-size: 12px;
                font-weight: normal;
                color: black;
                text-align: center;
                white-space: nowrap;
            }

            #caption {
                font-size: 12px;
                font-weight: normal;
                color: black;
                text-align: center;
                white-space: nowrap;
            }

            #name {
                font-size: 12px;
                font-weight: normal;
                color: black;
                width: 50%;
                display: flex;
            }

            #value {
                font-size: 12px;
                font-weight: normal;
                color: black;
                text-align: right;
                width: 50%;
            }

            #measurement {
                font-size: 12px;
                font-weight: normal;
                color: black;
                text-align: right;
            }

            #minmark {
                display: none;
                padding-top: 0px;
                font-size: 10px;
                font-weight: normal;
                color: white;
                width: 50%;
                text-align: left;
            }

            #maxmark {
                display: none;
                padding-top: 0px;
                font-size: 10px;
                font-weight: normal;
                color: white;
                width: 50%;
                text-align: right;
            }
        }                                

    `;
}

customElements.define("rs-gauge-card", RSGaugeCard);
// End of File