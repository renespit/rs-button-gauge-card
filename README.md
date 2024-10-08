# rs-button-gauge-card
Home Assistant Button and Gauge Card

![image](https://github.com/user-attachments/assets/70883527-535d-454b-af59-abf1881e55bb) ![image](https://github.com/user-attachments/assets/3d37b279-df77-4176-b465-780d56c409d2) ![image](https://github.com/user-attachments/assets/26d0cabb-650f-4497-a3d7-45ed7e2c7d20)

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

# Markdown for Netbeans ![Description Here](https://netbeans.apache.org/images/nblogo48x48.png)

***

## Description
This plugin adds some additional features to Apache Netbeans Markdown Editor.
- Preview
- Split Window
- Suggestion
- Export to DOCX, PDF and HTML

## Tables

| Header 1 | Header 2 |  Header 3 |
|----------|----------|-----------|
|   Col 1  |   Col 2  |   Col 3   |

## Checkboxes

- [x] Option 1
- [ ] Option 2
