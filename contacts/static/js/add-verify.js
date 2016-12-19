/**
 * Created by YeWenting on 14/11/2016.
 */

$.validator.setDefaults({
    submitHandler: function(form) {
        form.submit();
    }
});

$().ready(function(){
    $("#form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "div" )
                .append( error );
        },
        errorElement: "span"
    });
});
