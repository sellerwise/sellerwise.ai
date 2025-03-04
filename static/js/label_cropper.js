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
        $(".icon-color").attr('src', "/static/icons/label_cropper_icon/download.svg" );
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
        url: '/cropping-label/',
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
                $(".icon-color").attr('src', "/static/icons/label_cropper_icon/download-white.svg" );
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

//+++++++++++++++++++++++++++++PDF PREVIEW JS START++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++PDF PREVIEW JS END++++++++++++++++++++++++++++++++++++
