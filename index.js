document.addEventListener("DOMContentLoaded", function () {
    const openDialogButton = document.createElement('button');
    openDialogButton.id = 'openDialogButton';
    openDialogButton.innerHTML = '<img src="https://dev.chatbot.simplyfy.ai/media/chat_services/Image_20240208_194749_669_i5cF03X.png" alt="Chat Icon" style="width: 35px; height: 35px;">';
    openDialogButton.style.cssText = 'position: fixed; bottom: 20px; right: 76px; background-color: #64ffda; color: white; border: none; border-radius: 50%; padding: 10px 14px; cursor: pointer;';
    document.body.appendChild(openDialogButton);
    openDialogButton.addEventListener('click', openDialog);

    function getUrlParameter(url, name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(url);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const currentUrl = window.location.href;

    let serviceId;
    if (!getUrlParameter(currentUrl, 'service_id')) {
        serviceId = 'gcs_8669de';
    } else {
        serviceId = getUrlParameter(currentUrl, 'service_id');
    }


    function openDialog() {
        openDialogButton.removeEventListener('click', openDialog);

        const dialog = document.createElement('div');
        dialog.id = 'dialog';
        dialog.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background-color: #f8f9fa; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: none; ';

        function adjustDialogSize() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            if (screenWidth < 600) {
                dialog.style.width = '80%';
            } else if (screenWidth < 992) {
                dialog.style.width = '55%';
            } else {
                dialog.style.width = '400px';
            }
            if (screenHeight < 650) {
                dialog.style.height = '80%';
            } else {
                dialog.style.height = '650px';
            }
        }
        adjustDialogSize();

        window.addEventListener('resize', adjustDialogSize);

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
        closeButton.style.cssText = 'font-size: 10px; font-weight: 600; color: #000; margin-left: auto; cursor: pointer; border: 1px solid #000; border-radius: 50%; padding: 4px 6px;';

        const closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        closeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        closeIcon.setAttribute("width", "18");
        closeIcon.setAttribute("height", "18");
        closeIcon.setAttribute("viewBox", "0 0 24 24");
        closeIcon.setAttribute("fill", "none");
        closeIcon.setAttribute("stroke", "currentColor");
        closeIcon.setAttribute("stroke-width", "2");
        closeIcon.setAttribute("stroke-linecap", "round");
        closeIcon.setAttribute("stroke-linejoin", "round");
        closeIcon.classList.add("lucide", "lucide-x");

        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M18 6 6 18");

        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "m6 6 12 12");

        closeIcon.appendChild(path1);
        closeIcon.appendChild(path2);

        closeButton.appendChild(closeIcon);

        const containerInner = document.createElement('div');
        containerInner.className = 'container-inner';
        containerInner.style.cssText = 'overflow-y: auto;padding: 10px 15px 4px 15px; display: flex; flex-direction: column;';
        function adjustContainerInnerSize() {
            const screenHeight = window.innerHeight;
            if (screenHeight < 650) {
                containerInner.style.height = '62%';
                containerInner.style.paddingBottom = '4%';
            } else {
                containerInner.style.height = '425px';
                containerInner.style.paddingBottom = '-4%';
            }
        }

        adjustContainerInnerSize();

        window.addEventListener('resize', adjustContainerInnerSize);

        const conversation = document.createElement('div');
        conversation.className = 'conversation';
        conversation.style.cssText = 'flex: 1; padding: 10px; border-radius: 8px; margin-bottom: 10px; height: 360px;';

        const aiFirst = document.createElement('div');
        aiFirst.style.display = 'flex';
        aiFirst.style.flexDirection = 'row';
        aiFirst.style.alignItems = 'end';
        aiFirst.style.gap = '2px';

        const avatarImage = document.createElement('img');
        avatarImage.src = 'https://dev.chatbot.simplyfy.ai/media/chat_services/Image_20240208_194749_669_i5cF03X.png';
        avatarImage.alt = '';
        avatarImage.style.width = '24px';
        avatarImage.style.height = '24px';
        avatarImage.style.marginBottom = '18px';

        const message1 = document.createElement('div');
        message1.className = 'message left';
        message1.style.cssText = 'background-color: #dbdada; color: #333; float: left; align-self: flex-start; max-width: 85%; margin-bottom: 10px; padding: 10px; border-radius: 12px 12px 12px 0px;';
        message1.textContent = "Absolutely, let's dive in 🙏! 🌟 Feel free to ask anything on your mind, and we'll navigate through together! 🚀.";

        aiFirst.appendChild(avatarImage);
        aiFirst.appendChild(message1);
        conversation.appendChild(aiFirst)

        const typing = document.createElement('div');
        typing.className = 'typing';
        typing.style.cssText = 'flex: 1; background-color: #fff; border-top: 1px solid #eaeaea;display: flex; align-items: center; padding:8px; border-radius: 8px; position: absolute; bottom: 0; width: 90%;';

        const typingMessage = document.createElement('div');
        typingMessage.className = 'typing-message';
        typingMessage.style.cssText = 'margin-right: 10px;';

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
            containerInner.scrollTop = containerInner.scrollHeight;
            inputField.focus();
        });

        closeButton.addEventListener('click', function () {
            dialog.style.display = 'none';
        });

        sendIcon.addEventListener('click', function () {
            const messageContent = inputField.value.trim();
            sendMessage(messageContent);
            containerInner.scrollTop = containerInner.scrollHeight;
        });
        inputField.addEventListener('keypress', function (event) {
            if (event.key === 'Enter' && event.shiftKey) {
                event.preventDefault();
                inputField.value += '\n';
                containerInner.scrollTop = containerInner.scrollHeight;
            } else if (event.key === 'Enter') {
                const messageContent = inputField.value.trim();
                sendMessage(messageContent);
                containerInner.scrollTop = containerInner.scrollHeight;
            }
        });
        const followupQuestionsSection = document.createElement('div');
        followupQuestionsSection.className = 'follow-up';

        function sendMessage(messageContent) {
            const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svgIcon.setAttribute("width", "30");
            svgIcon.setAttribute("height", "30");
            svgIcon.setAttribute("viewBox", "0 0 24 24");
            svgIcon.setAttribute("fill", "none");
            svgIcon.setAttribute("fill", "#262c40");
            svgIcon.setAttribute("color", "#fff");
            svgIcon.setAttribute("stroke", "currentColor");
            svgIcon.setAttribute("stroke-width", "2");
            svgIcon.setAttribute("stroke-linecap", "round");
            svgIcon.setAttribute("stroke-linejoin", "round");
            svgIcon.classList.add("lucide", "lucide-circle-user");

            const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle1.setAttribute("cx", "12");
            circle1.setAttribute("cy", "12");
            circle1.setAttribute("r", "10");

            const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle2.setAttribute("cx", "12");
            circle2.setAttribute("cy", "10");
            circle2.setAttribute("r", "3");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662");

            svgIcon.appendChild(circle1);
            svgIcon.appendChild(circle2);
            svgIcon.appendChild(path);

            const responseUserContent = messageContent;

            conversation.style.display = 'flex';
            conversation.style.flexDirection = 'column';

            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.style.alignItems = 'center';
            container.style.gap = '1px';
            container.appendChild(svgIcon);

            const responseUserMessage = document.createElement('div');
            responseUserMessage.className = 'message left';
            responseUserMessage.style.cssText = 'position: relative; background-color: #007bff; color: #fff; float: left; align-self: flex-start; max-width: 85%; margin-bottom: 10px; padding: 10px; border-radius: 12px 12px 12px 0px;';
            responseUserMessage.textContent = responseUserContent;

            container.appendChild(responseUserMessage);
            conversation.appendChild(container);

            if (messageContent !== '') {
                inputField.value = '';

                const ai = document.createElement('div');
                ai.style.display = 'flex';
                ai.style.flexDirection = 'row';
                ai.style.alignItems = 'end';
                ai.style.gap = '4px';

                const avatarImage = document.createElement('img');
                avatarImage.src = 'https://dev.chatbot.simplyfy.ai/media/chat_services/Image_20240208_194749_669_i5cF03X.png';
                avatarImage.alt = '';
                avatarImage.style.width = '24px';
                avatarImage.style.height = '24px';
                avatarImage.style.marginBottom = '18px';

                const typingMessage = document.createElement('div');
                typingMessage.className = 'message left';
                typingMessage.style.cssText = 'background-color: #dbdada; color: #333; float: left; align-self: flex-start;max-width: 85%;margin-bottom: 10px;padding: 10px;border-radius: 10px';
                typingMessage.textContent = 'Typing...';
                conversation.appendChild(typingMessage);

                const responseTimeout = setTimeout(() => {
                    conversation.removeChild(typingMessage);
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'message left';
                    errorMessage.style.cssText = 'background-color: #dbdada; color: #333; float: left; align-self: flex-start;max-width: 85%;margin-bottom: 10px;padding: 10px;border-radius: 10px';
                    errorMessage.textContent = 'Response is taking too long. Please try again later.';
                    conversation.appendChild(errorMessage);
                }, 5000);

                const apiUrl = 'https://dev.chatbot.simplyfy.ai/api/v1/master/services/chat/?is_testing=True';
                const requestBody = {
                    "service_id": `${serviceId}`,
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
                        clearTimeout(responseTimeout);
                        conversation.removeChild(typingMessage);

                        const responseDataContent = data.data.content;
                        const responseMessage = document.createElement('div');
                        responseMessage.className = 'message left';
                        responseMessage.style.cssText = 'background-color: #dbdada; color: #333; float: left; align-self: flex-start;max-width: 85%;margin-bottom: 10px;padding: 10px;border-radius: 12px 12px 12px 0px;';
                        responseMessage.textContent = responseDataContent;
                        ai.appendChild(avatarImage);

                        ai.appendChild(responseMessage);
                        conversation.appendChild(ai);
                        inputField.value = '';

                        const followupQuestions = data.followup_ques;
                        while (followupQuestionsSection.firstChild) {
                            followupQuestionsSection.removeChild(followupQuestionsSection.firstChild);
                        }
                        followupQuestionsSection.style.cssText = 'display: flex; flex: 1; padding: 2px; min-height: 20px; margin: 0px; align-items: flex-start;  color: #333; overflow-x: auto; position: absolute; bottom: 0; margin-bottom:48px;width:92%';

                        const followupQuestionsRow = document.createElement('div');
                        followupQuestionsRow.style.cssText = 'display: flex; flex-direction: row;gap:2px';

                        followupQuestions.forEach((followQueItem, index) => {
                            if (index < 4) {
                                const followupQuestionItem = document.createElement('div');
                                followupQuestionItem.style.cssText = 'min-width: 28%;';

                                const button = document.createElement('button');
                                button.style.cssText = 'position: relative; white-space: nowrap; border-radius: 0.375rem; padding-top: 0.75rem; padding-right: 1rem; padding-bottom: 0.75rem; padding-left: 1rem;min-width:100px';

                                button.addEventListener('click', () => {
                                    messageContent = `${followQueItem.part1} ${followQueItem.part2}`;
                                    sendMessage(messageContent);
                                    containerInner.scrollTop = containerInner.scrollHeight;

                                });

                                const flexContainer = document.createElement('div');
                                flexContainer.style.cssText = 'display: flex; width: 100%;  align-items: center; justify-content: center;';

                                const flexInnerContainer = document.createElement('div');
                                flexInnerContainer.style.cssText = 'display: flex; width: 100%; align-items: center; justify-content: space-between; ';

                                const textContainer = document.createElement('div');
                                textContainer.style.cssText = 'display: flex; flex-direction: column; overflow: hidden;';

                                const truncatedPart1 = document.createElement('div');
                                truncatedPart1.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';

                                truncatedPart1.textContent = followQueItem.part1;

                                const truncatedPart2 = document.createElement('div');
                                truncatedPart2.style.cssText = 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: normal; opacity: 0.5;';
                                const truncatedText = followQueItem.part2.substring(0, 18);

                                const truncatedContent = followQueItem.part2.length > 18 ? truncatedText + '...' : truncatedText;

                                truncatedPart2.textContent = truncatedContent;

                                textContainer.appendChild(truncatedPart1);
                                textContainer.appendChild(truncatedPart2);

                                flexInnerContainer.appendChild(textContainer);

                                flexContainer.appendChild(flexInnerContainer);
                                button.appendChild(flexContainer);
                                followupQuestionItem.appendChild(button);
                                followupQuestionsRow.appendChild(followupQuestionItem);
                            }
                        });

                        followupQuestionsSection.appendChild(followupQuestionsRow);
                        containerInner.appendChild(followupQuestionsSection);

                        containerInner.scrollTop = containerInner.scrollHeight;

                    })
                    .catch(error => {
                        clearTimeout(responseTimeout);
                        console.error('Error:', error);
                    });
            }
        }
    }
    const style = document.createElement('style');
    style.textContent = `
     .container-inner::-webkit-scrollbar {
         width: 4px;
         height: 3px;
     }
     .container-inner::-webkit-scrollbar-track {
         border-radius: 8px;
     }
     .container-inner::-webkit-scrollbar-thumb {
         background-color: darkgrey;
         border-radius: 8px;
     }
     .follow-up::-webkit-scrollbar {
         width: 4px;
         height: 3px;
     }
     .follow-up::-webkit-scrollbar-track {
         border-radius: 8px;
     }
     .follow-up::-webkit-scrollbar-thumb {
         background-color: darkgrey;
         border-radius: 8px;
     }
 `;
    document.head.appendChild(style);
});
