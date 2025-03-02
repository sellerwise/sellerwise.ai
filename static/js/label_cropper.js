$(document).ready(function(){
    $(".loader").hide();
})

$(".info-icon").click(function()
{
    $("#productModal").modal('show')
})

//+++++++++++++++++++++++++++++UPLOAD FILE JS START++++++++++++++++++++++++++++++++++++
document.addEventListener('DOMContentLoaded', function ()
{
    const uploadBox = document.getElementById('dropZone');
    const fileInput = document.getElementById('pdf_file');

    // Trigger file input when upload box is clicked
    uploadBox.addEventListener('click', () => {
        $('#upload_box_text').html("Drag and drop your shipping label PDF here, or click to browse");
        $("#iframe").attr('src', '');
        $("#downloadSingle").attr('href', 'javascript:void(0);');
        $("#pdfPreview").css('display', 'block');
        $("#iframe").css('display', 'none');
        $("#downloadSingle").css('background-color', "#dfdfdf")
        $(".download-btn-color").css('color', "#000000" );
        $(".icon-color").attr('src', "/static/icons/download.svg" );
        $("#thermalPrinter").removeClass('btn-color');
        $("#inkjetPrinter").removeClass('btn-color');
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function (event)
    {
        const files = event.target.files;  // Get the selected files
        const fileCount = files.length;    // Get the number of files selected

        if (fileCount > 0)
        {
            let fileNames = '';
            let totalSize = 0;

            // Loop through all selected files to gather names and sizes
            for (let i = 0; i < fileCount; i++)
            {
                const file = files[i];
                fileNames += file.name + (i < fileCount - 1 ? ', ' : '');  // Concatenate file names
            }

            // Display the file names in the upload box
            $('#upload_box_text').html(fileNames);
        }
    });
});

//+++++++++++++++++++++++++++++UPLOAD FILE JS END++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++AJAX AND URL JS START++++++++++++++++++++++++++++++++++++

$("#thermalPrinter").click(function()
{
    $("#thermalPrinter").addClass('btn-color');
    $("#inkjetPrinter").removeClass('btn-color');
    var a = main_function('thermal_printer');
    if (a != false)
    {
        $("#pdfPreview").css('display', 'none');
        $("#iframe").css('display', 'block');
    }
})

$("#inkjetPrinter").click(function()
{
    $("#thermalPrinter").removeClass('btn-color');
    $("#inkjetPrinter").addClass('btn-color');
    var a = main_function('inkjet_printer');
    if (a != false)
    {
        $("#pdfPreview").css('display', 'none');
        $("#iframe").css('display', 'block');
    }
})


function main_function(printer_type)
{
    $("#iframe").attr('src', '');

    var pdf_file = $('#pdf_file')[0].files;
    if (pdf_file.length == 0)
    {
        showToast("Please upload file first.", "danger", 5000);
        return false;
    }
    var upload_data = new FormData();
    for (var i = 0; i < pdf_file.length; i++) {
        upload_data.append('pdf_file[]', pdf_file[i]);
    }
    upload_data.append('printer_type', printer_type);
    upload_data.append('csrfmiddlewaretoken', $('input[name="csrfmiddlewaretoken"]').val());

    $.ajax({
        url: '/cropping_tool/',
        type: 'POST',
        data: upload_data,
        processData: false,
        contentType: false,
        beforeSend: function()
        {
            $('.loader').show();
        },
        success: function(data)
        {
            if (data.id == 0)
            {
                showToast(data.msg, "danger", 5000);
                return false;
            }
            else if(data.id == 1)
            {
                $("#iframe").attr('src', data.download_url);
                $("#downloadSingle").attr('href', data.download_url);
                $("#downloadSingle").css('background-color', "#1BA64B" );
                $(".download-btn-color").css('color', "#FFFFFF" );
                $(".icon-color").attr('src', "/static/icons/download-white.svg" );
                showToast(data.msg, "success", 5000);
            }
        },
        complete: function()
        {
            $('.loader').hide();
        }
    });
}

//+++++++++++++++++++++++++++++AJAX AND URL JS END++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++TOAST JS START++++++++++++++++++++++++++++++++++++

//let icon = {
//    success:
//    '<span class="material-symbols-outlined">task_alt</span>',
//    danger:
//    '<span class="material-symbols-outlined">error</span>',
//};

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

//+++++++++++++++++++++++++++++PDF PREVIEW JS START++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++PDF PREVIEW JS END++++++++++++++++++++++++++++++++++++
