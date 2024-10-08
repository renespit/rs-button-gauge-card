# rs-button-gauge-card
Home Assistant Button and Gauge Card

![image](https://github.com/user-attachments/assets/70883527-535d-454b-af59-abf1881e55bb) ![image](https://github.com/user-attachments/assets/3d37b279-df77-4176-b465-780d56c409d2) ![image](https://github.com/user-attachments/assets/26d0cabb-650f-4497-a3d7-45ed7e2c7d20)

Dashboard example

![image](https://github.com/user-attachments/assets/3d092d0e-79c3-4342-be80-ceb96f5f6ddf)

***

## Installation:
***

  (This card is not downloadable via HACS)
  
  Step into your terminal (left in your sidebar) ![image](https://github.com/user-attachments/assets/cf82f2a1-b100-4e6c-8e07-aefefc4a039b)

    cd /config/www/community
    mkdir rs-button-gauge-card
    cd rs-button-gauge-card
    wget https://github.com/renespit/rs-button-gauge-card/blob/main/rs-button-gauge-card.js
&nbsp;<br />
Add in your configuration.yaml the lines:

    lovelace:
      resources:
        - url: /hacsfiles/rs-button-gauge-card/rs-button-gauge-card.js
          type: module            
&nbsp;<br />
! Restart your Home Assistant

## Features:
***

- Works with entities:
    - switch
    - input_boolean
    - input_button
    - sensor
    - cover
    - scene
    - script
    - automation
    - media_player

- Custom CSS    
- Title (text on the top) accepts pure HTML or plain text    
- Caption (text on the bottom) accepts pure html or plain text    
- MDI Icons support

## Configuration:
***
### Options

| Name         | Type                     | Default                                 | Supported options                                          | Description                                                                                         |
|--------------|--------------------------|-----------------------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| type         | string                   | required                                | <pre>custom:rs-button-gauge-card</pre>                     | Start of a beautiful card :)                                                                        |
| entity       | string                   | required                                | <pre>switch.dishwasher</pre> <pre>input_button.lamp1</pre> | Almost any entity is legit. If you don't have a entity create a dummy entity (see below this table) |
| sensor       | string                   | required                                | <pre>sensor.dishwasher</pre>                               | Every sensor is legit. If you don't have a sensor create a dummy sensor (see below this table)      |
| measurement  | string                   | optional                                | Examples: "°C",W ,L, etc.                                  | Just a text that gives the measurement                                                              |
| name         | string                   | optional                                | Something that explains what the sensor is measuring (examples: P, T or Temp., Water, Gas, etc.)                                                                 | &nbsp; | 
| min          | value                    | optional                                | numbers, example: <pre>-123.45678</pre>                    | Measuring room temp. then <pre>min: 0</pre>. If you have a 16 amp fuse and measuring power then you should use <pre>min: 0</pre>                                 |
| max          | value                    | optional (required if min is used)      | numbers, example: <pre>-123.45678</pre>                    | Measuring room temp. then <pre>max: 30</pre>. If you have a 16 amp fuse and measuring power then you should use <pre>max: 3600</pre>                             |
| miniicon     | mdi:icon                 | optional                                | mdi:icons (see: <a href='https://pictogrammers.com/library/mdi/' target='_new'>Icon Library</a>) | &nbsp; |
| icon         | mdi:icon                 | optional                                | mdi:icons (see: <a href='https://pictogrammers.com/library/mdi/' target='_new'>Icon Library</a>) | &nbsp; | 
| color        | color #/rgb/named        | optional                                | #012345, RGB("01","23","45"), lightgreen                                                         | &nbsp; |
| title        | string/html or plain     | optional                                | Plain text<pre>plain text</pre>HTML-code<pre>\|<br />\<a href='https://community.home-assistant.io' target='_new'\>HA Community\</a\></pre>      | &nbsp; |
| caption      | string/html or plain     | optional                                | Plain text<pre>plain text</pre>HTML-code<pre>\|<br />\<a href='https://community.home-assistant.io' target='_new'\>HA Community\</a\></pre>      | &nbsp; |
| show_button  | boolean                  | optional                                | true or false <pre>true/false</pre>                                                                                                              | &nbsp; |            
| show_diagram | boolean                  | optional                                | true or false <pre>true/false</pre>                                                                                                              | &nbsp; |            
| show_donut   | boolean                  | optional                                | true or false <pre>true/false</pre>                                                                                                              | &nbsp; |            
| show_caption | boolean                  | optional                                | true or false <pre>true/false</pre>                                                                                                              | &nbsp; |            
| show_info    | boolean                  | optional                                | true or false <pre>true/false</pre>                                                                                                              | &nbsp; |            
| state        | array                    | required (if empty, then <pre>use state: []</pre>) | &nbsp; |
| - value      | 'on'/'off'/'unavailable' | optional                                | <pre>value: 'on'</pre><pre>value: 'off'</pre><pre>value: 'unavailable'</pre>
| - icon       | mdi:icon                 | optional                                | mdi:icons (see: <a href='https://pictogrammers.com/library/mdi/' target='_new'>Icon Library</a>) | &nbsp; |
| - color      | color #/rgb/named        | optional                                | #012345, RGB("01","23","45"), lightgreen                                                         | &nbsp; |
| - caption    | string/html or plain     | optional                                | Plain text<pre>plain text</pre>HTML-code<pre>\|<br />\<a href='https://community.home-assistant.io' target='_new'\>HA Community\</a\></pre>      | &nbsp; |
| styles       | string                   | optional                                | <pre>\|<br />      ha-card {<br />        margin: 0px !important;<br />        margin-left: 0px !important;<br />        margin-right: 10px !important;<br />        margin-top: 10px !important;<br />        border-radius: 0px;<br />        border-top: 1px solid #DDDDDD !important;<br />        border-left: 1px solid #DDDDDD !important;<br />        border-right: 1px solid #000 important;<br />        border-bottom: 1px solid #000 !important;<br />        background-color: #CACACA !important;<br />        -webkit-box-shadow: 5px 5px 12px -5px rgba(0,0,0,0.84);<br />        -moz-box-shadow: 5px 5px 12px -5px rgba(0,0,0,0.84);<br />        box-shadow: 5px 5px 12px -5px rgba(0,0,0,0.84);<br />        width: calc(100% - 10px) !important;<br />        height: calc(100% - 10px) !important;<br />        padding: 0px;<br />        display: flex;<br />        } </pre> | &nbsp; |

### Creation of a dummy switch and sensor
#### Dummy sensor and switch
Add following line to configuration.yaml

    sensor:
      - platform: template
        sensors:
          zero:
            value_template: 0
    switch:
      - platform: template
        switches:
          dummy:
            turn_on:
              service: switch.turn_on
            turn_off:
              service: switch.turn_off

### Overview of a working card
Example:

    type: custom:rs-button-gauge-card
    entity: switch.vaatwasser
    sensor: sensor.vaatwasser
    measurement: 'W'
    name: P 
    min: 0
    max: 3600
    icon: mdi:dishwasher
    color: green
    caption: Vaatwasser
    show_button: true
    show_diagram: true
    show_diagram: false
    show_caption: true
    show_info: false
    state:
      - value: 'off'
        icon: mdi:dishwasher
        color: var(--icon-switch-on)
        caption: Vaatwasser - Uit
      - value: 'on'
        icon: mdi:dishwasher
        color: var(--icon-switch-on)
        caption: Vaatwasser - Aan
      - value: 'unavailable'
        icon: mdi:dishwasher
        color: var(--icon-switch-on)
        caption: |
                <marquee scrollamount=10
                style='
                text-transform: uppercase; 
                font-family: Roboto, Noto, sans-serif; 
                font-size: 17.5px; 
                font-weight: normal; 
                color: red;
                width: 100%; 
                background-color: transparent;
                vertical-align: middle;
                text-align: center;
                display: flex;'>Vaatwasser - Bediening uitgeschakeld</marquee>
    styles: | 
            ha-card {
                margin: 0px !important;
                margin-left: 0px !important;
                margin-right: 10px !important;
                margin-top: 10px !important;
                border-radius: 0px;
                border-top: 1px solid #DDDDDD !important;
                border-left: 1px solid #DDDDDD !important;
                border-right: 1px solid #000 !important;
                border-bottom: 1px solid #000 !important;
                background-color: #CACACA !important;            
                -webkit-box-shadow: 5px 5px 12px -5px rgba(0,0,0,0.84);
                -moz-box-shadow: 5px 5px 12px -5px rgba(0,0,0,0.84);
                box-shadow: 5px 5px 12px -5px rgba(0,0,0,0.84);
                width: calc(100% - 10px) !important;
                height: calc(100% - 10px) !important;
                padding: 0px;
                display: flex;
            } 

  icon-switch-on: "yellow"
  icon-switch-off: "rgb(68, 115, 158)"
  icon-switch-unavailable: "darkgray"