//+++++++++++++++++++++++++++++TOAST JS START++++++++++++++++++++++++++++++++++++

let icon = {
    success:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="black" stroke-width="2" stroke-dasharray="95 1000" transform="rotate(-45 12 12)"/><path d="M7 12l4 4 7-8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    danger:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="black" stroke-width="2" fill="none"/><path d="M12 8v4M12 16h.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const showToast = (message = "Sample Message", toastType = "info", duration = 5000) =>
{
    if (!Object.keys(icon).includes(toastType))
        toastType = "info";

    let box = $('<div></div>')
        .addClass('toast')
        .addClass('show')
        .addClass(`toast-${toastType}`)
        .html(`
            <div class="toast-content-wrapper">
                <div class="toast-icon">
                    ${icon[toastType]}
                </div>
                <div class="toast-message">${message}</div>
                <div class="toast-progress"></div>
            </div>
        `);

    duration = duration || 5000;
    box.find(".toast-progress").css('animation-duration', `${duration / 1000}s`);

    let toastAlready = $("body").find(".toast");
    if (toastAlready.length) {
        toastAlready.remove();
    }

    $("body").append(box);
};

//+++++++++++++++++++++++++++++TOAST JS END++++++++++++++++++++++++++++++++++++

function isValidEmail(email)
{
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|COM)$/;
    return emailRegex.test(email);
}

$("#submit").click(function()
{
    name = $("#name").val();
    email = $("#email").val();
    isValidEmail = isValidEmail(email);
    subject = $("#subject").val();
    message = $("#message").val();

    if (name == '')
    {
        showToast('Name is required', "danger", 5000);
        return false;
    }
    if (email == '')
    {
        showToast('Email is required', "danger", 5000);
        return false;
    }
    if (isValidEmail == false)
    {
        showToast('Invalid Email', "danger", 5000);
        return false;
    }
    if (subject == '')
    {
        showToast('Subject is required', "danger", 5000);
        return false;
    }
    if (message == '')
    {
        showToast('Message is required', "danger", 5000);
        return false;
    }

    var send_data = $("#contact-form").serialize();
    $.ajax({
        url: '/contact-us/',
        type: 'POST',
        data: send_data,
        processData: false,
        contentType: false,
        success: function(data)
        {
            showToast(data.msg, "success", 5000);
        }
    })
})