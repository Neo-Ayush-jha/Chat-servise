document.addEventListener("DOMContentLoaded", function () {
    const openDialogButton = document.createElement('button');
    openDialogButton.id = 'openDialogButton';
    openDialogButton.textContent = 'Open Dialog Box';
    openDialogButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background-color: #007bff; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer;';
    document.body.appendChild(openDialogButton);
    openDialogButton.addEventListener('click', openDialog);

    function openDialog() {
        openDialogButton.removeEventListener('click', openDialog);

        const dialog = document.createElement('div');
        dialog.id = 'dialog';
        dialog.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 400px; background-color: #f8f9fa; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: none; height: 650px;';

        const content = document.createElement('div');
        content.className = 'content';
        content.style.cssText = 'display: flex; flex-direction: column;';

        const topRow = document.createElement('div');
        topRow.className = 'top-row';
        topRow.style.cssText = ' padding: 10px 15px 0px 15px; display: flex; align-items: center; background: linear-gradient(to right, #93eefa, #5b5bc2); border-top-left-radius: 8px; border-top-right-radius: 8px; position: relative;';

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.style.marginRight = '15px';
        avatar.innerHTML = '<img src="https://dev.chatbot.simplyfy.ai/media/chat_services/Image_20240208_194749_669_i5cF03X.png" alt="" style=" width: 45px; height: 45px;">';

        const company = document.createElement('div');
        company.className = 'company';
        company.style.cssText = 'display: flex; flex-direction: column;padding-bottom: 8%;';

        const header = document.createElement('div');
        header.className = 'header';
        header.style.cssText = 'font-size: 28px; font-weight: 700; color: #000;';
        header.textContent = 'TAU ChatBot';

        const status = document.createElement('div');
        status.className = 'status';
        status.style.color = '#9b9b9b';
        status.textContent = 'Online';

        const closeButton = document.createElement('div');
        closeButton.className = 'close';
        closeButton.style.cssText = 'font-size: 10px; font-weight: 600; color: #000; margin-left: auto; cursor: pointer; border: 1px solid #000; border-radius: 50%; padding: 6px 8px;';
        closeButton.textContent = 'X';

        const containerInner = document.createElement('div');
        containerInner.className = 'container-inner';
        containerInner.style.cssText = 'height: 508px;overflow-y: auto;padding: 10px 15px 4px 15px; display: flex; flex-direction: column;';


        const conversation = document.createElement('div');
        conversation.className = 'conversation';
        conversation.style.cssText = 'flex: 1; padding: 10px; border-radius: 8px; margin-bottom: 10px; height: 380px;';

        const message1 = document.createElement('div');
        message1.className = 'message left';
        message1.style.cssText = 'background-color: #f0f0f0; color: #333; float: left; align-self: flex-start;max-width: 70%;margin-bottom: 10px;padding: 10px;border-radius: 10px;';
        message1.textContent = "Absolutely, let's dive in 🙏! 🌟 Feel free to ask anything on your mind, and we'll navigate through together! 🚀.";
        conversation.appendChild(message1);

        const typing = document.createElement('div');
        typing.className = 'typing';
        typing.style.cssText = 'flex: 1; background-color: #fff; border-top: 1px solid #eaeaea; display: flex; align-items: center; padding: 5px 10px 5px 10px; border-radius: 8px; position: absolute; bottom: 0; width: 90%;';

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Type your message here';
        inputField.style.cssText = 'flex: 1; padding: 5px; margin-right: 10px; border: 1px solid #ccc; border-radius: 3px;';
        inputField.autofocus = true; 

        const sendIcon = document.createElement('div');
        sendIcon.className = 'send-icon';
        sendIcon.style.cursor = 'pointer';
        sendIcon.style.width = '30px';
        sendIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path fill="#007bff" d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z" /></svg>';

        company.appendChild(header);
        company.appendChild(status);
        topRow.appendChild(avatar);
        topRow.appendChild(company);
        topRow.appendChild(closeButton);
        content.appendChild(topRow);
        containerInner.appendChild(conversation);
        typing.appendChild(inputField);
        typing.appendChild(sendIcon);
        containerInner.appendChild(typing);
        dialog.appendChild(content);
        dialog.appendChild(containerInner);

        document.body.appendChild(openDialogButton);
        document.body.appendChild(dialog);

        openDialogButton.addEventListener('click', function () {
            dialog.style.display = 'block';
            inputField.focus(); 
        });

        closeButton.addEventListener('click', function () {
            dialog.style.display = 'none';
        });

        sendIcon.addEventListener('click', function () {
            const messageContent = inputField.value.trim();
            if (messageContent !== '') {
                inputField.value = '';
                const apiUrl = 'https://dev.chatbot.simplyfy.ai/api/v1/master/services/chat/?is_testing=True';
                const requestBody = {
                    "service_id": "gcs_8669de",
                    "data": [
                        {
                            "role": "user",
                            "content": messageContent
                        }
                    ]
                };
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);

                        const responseDataContent = data.data.content;
                        const responseUserContent = data.user_message.content;

                        const responseUserMessage = document.createElement('div');
                        responseUserMessage.className = 'message left';
                        responseUserMessage.style.cssText = 'background-color: #007bff; color: #fff; float: right; align-self: flex-end;max-width: 70%;margin-bottom: 10px;padding: 10px;border-radius: 10px;';
                        responseUserMessage.textContent = responseUserContent;
                        conversation.appendChild(responseUserMessage);

                        const responseMessage = document.createElement('div');
                        responseMessage.className = 'message left';
                        responseMessage.style.cssText = 'background-color: #f0f0f0; color: #333; float: left; align-self: flex-start;max-width: 70%;margin-bottom: 10px;padding: 10px;border-radius: 10px;overflow-y: auto;';
                        responseMessage.textContent = responseDataContent;
                        conversation.appendChild(responseMessage);

                        inputField.value = '';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });

    }
});
