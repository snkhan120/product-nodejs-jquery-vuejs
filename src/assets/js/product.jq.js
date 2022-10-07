$(document).ready(function () {
    console.log("jQuery is ready!");

    // get bootstrap popup modals    
    var productDeleteModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
    var productSaveModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    var editProductModal = new bootstrap.Modal(document.getElementById('editProductModal'));

    // delete product
    $(".deleteProduct").click(function(){
        productDeleteModal.show();  
        $('#productID').val(this.id);  
        // alert(this.id);
    });

    // click on ajax EDIT button
    $('#product-row').on('click', '.ajax-edit', function(e){
      editProductModal.show();  
      const id = $(this).attr("data-id");
      $('#updateProductId').val(id);
      $('#productName').val($('tr#'+id).find("td").eq(1).html());
      $('#productPrice').val($('tr#'+id).find("td").eq(2).html());
    });

    // click on ajax DELETE button
    $('#product-row').on('click', '.deleteProduct', function(e){
      productDeleteModal.show();  
      $('#productID').val(this.id);
    });
    
    // product save
    $("#product-save").submit(function (e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');

        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: (data, status) => {
                console.log(status, data); // show response 
                const buttonEditDel = `<button type="button" class="btn btn-info ajax-edit" data-id="${data._id}" id="edit-${data._id}" data-bs-toggle="modal" data-bs-target="#editProductModal">Edit</button> <button type="button" id="${data._id}" class="btn btn-danger deleteProduct" data-toggle="modal" data-target="#deleteProductModal">Delete</button>`;
                $('#product-row').append('<tr class="p-2 mb-2 bg-warning text-white"  id="'+ data._id +'"> <td>' + data._id + '</td>  <td>' + data.name + '</td> <td>' + data.price + '</td> <td>'+ buttonEditDel +'</td></tr>');
                // animate on added product
                $('html,body').animate({
                    scrollTop: $("tr#"+ data._id).offset().top},
                'slow');
                // hide modal after data save
                $(form)[0].reset();
                productSaveModal.hide();
                
            },
            error: (request) => {
                console.log('An error occurred.');
                $('.msg').addClass('show');
                setTimeout(function() {
                    $('.msg').fadeOut('fast');
                }, 10000);
                $('.msg').html(request.responseJSON.message);
                console.log(request.responseJSON.message);
            },
        });

    });
    
    // product update
    $("#product-update").submit(function (e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        // var actionUrl = form.attr('action');
        const prodID = $("#updateProductId").val();
        $.ajax({
            type: "PUT",
            // url: actionUrl,
            url: "/api/products/" + prodID,
            data: form.serialize(), // serializes the form's elements.
            success: (data, status) => {
                console.log(status, data);                 
                // hide modal after data save
                editProductModal.hide();
                $('tr#'+prodID).find("td").eq(1).html( $('#productName').val())
                $('tr#'+prodID).find("td").eq(2).html( $('#productPrice').val())
                
                $(form)[0].reset();
            },
            error: (request) => {
                console.log('An error occurred.');
                $('.msg').addClass('show');
                setTimeout(function() {
                    $('.msg').fadeOut('fast');
                }, 10000);
                $('.msg').html(request.responseJSON.message);
                console.log(request.responseJSON.message);
            },
        });

    });


});

