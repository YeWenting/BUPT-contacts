/**
 * Created by YeWenting on 2016/11/13.
 */

/******************
 * TODO:
 *      链接数据库后，对于非法操作要复原其原来数据。
 */

$(".delete-button").on("click", function () {
    this_name = $(this).closest("div").find(".name").text();
    $.confirm({
        title: 'Confirm Deletion',
        content: "Do you REALLY want to delete?",
        icon: 'fa fa-question-circle',
        animation: 'scale',
        closeAnimation: 'scale',
        opacity: 0.5,
        buttons: {
            'confirm': {
                text: 'Yes',
                btnClass: 'btn-info',
                action: function () {
                    console.log(name);
                    $.post("/delete/", {name: this_name},
                        function(data, status){
                            if (data.message == 'success')
                                $.alert({
                                    title: 'SUCCESS',
                                    content: 'The specific person has been deleted.',
                                    icon: 'fa fa-fw fa-ban',
                                    animation: 'zoom',
                                    closeAnimation: 'zoom',
                                    buttons: {
                                        okay: {
                                            text: 'Okay',
                                            btnClass: 'btn-primary',
                                            action: function() {
                                                window.location.reload()
                                            }
                                        }
                                    }
                                });
                            else
                                $.alert({
                                    title: 'error',
                                    content: 'Operation failed',
                                    icon: 'fa fa-fw fa-ban',
                                    animation: 'zoom',
                                    closeAnimation: 'zoom',
                                    buttons: {
                                        okay: {
                                            text: 'Okay',
                                            btnClass: 'btn-primary'
                                        }
                                    }
                                });
                    })
                }
            },
            cancel: function () {
            }
        }
    });
});

$(document).ready(function () {
    //
    // $("#sign-in").on('click', function () {
    //     var error = "";
    //     var email = $("#signInEmail").val();
    //     var password = $("#signInPass").val();
    //
    //     /* An easy email verify */
    //     if (!checkEmail(email))
    //         error += "Email address is not valid! <br>";
    //
    //     /* An easy password check */
    //     if (password.length < 8) error += "Password should be more than 8 characters! <br>";
    //     if (password.match(/([0-9])+/) == null) error += "Password should contain number! <br>";
    //     if (password.match(/([A-Za-z])+/) == null) error += "Password should contain English letter! <br>";
    //     if (error != "") {
    //         console.log(error);
    //         $.alert({
    //             title: 'Alert!',
    //             content: error,
    //             icon: 'fa fa-fw fa-ban',
    //             animation: 'zoom',
    //             closeAnimation: 'zoom',
    //             buttons: {
    //                 okay: {
    //                     text: 'Okay',
    //                     btnClass: 'btn-primary'
    //                 }
    //             }
    //         });
    //     }
    // });

    $(".edit-button").click(function () {

        $(this).closest("div").find(".contact-message").attr("contenteditable", "true");
        var button = $("<i></i>").attr("class", "fa fa-fw fa-check-square-o check-button");
        $(this).after(button);
        $.alert("You can edit " + $(this).closest("div").find(".name").text() + "'s info now.");
        $(this).remove();

        $(".check-button").click(function ()
        {
            newName = $(this).closest("div").find(".name").text();
            newGender = $(this).closest("div").find(".gender").text();
            newTelephone = $(this).closest("div").find(".telephone").text();
            newMobile = $(this).closest("div").find(".mobilephone").text();
            newAddress = $(this).closest("div").find(".location").text();
            newQQ = $(this).closest("div").find(".OICQ").text();
            newEmail = $(this).closest("div").find(".email").text();
            $.post('')

            $(this).closest("div").find(".contact-message").attr("contenteditable", "false");
            var button = $("<i></i>").attr("class", "fa fa-fw fa-edit edit-button");
            $(this).after(button);
            // TODO: The submit function
            alert($(this).closest("div").find(".name").text() + "'s info has been updated.");
            $(this).remove();
        });
    });

    $(".name").blur(function () {

        var name = $(this).text();
        var s = $(this).closest("div").find(".error-tab").text();
        var mes = "Nickname is limited to 20 characters! ";

        /* Check the length */
        if (name.length > 20) {
            if (s.search(mes) < 0) s += mes;
            $(this).text("null");
            $(this).closest("div").find(".callout").show();
        }
        else {
            $(this).closest("li").find("h4").text(name);
            s = s.replace(mes, "");    //replace() return the cut string back
            if (s == "") $(this).closest("div").find(".callout").hide();
        }
        $(this).closest("div").find(".error-tab").text(s);
    });

    $(".telephone").blur(function () {

        var phone = $(this).text();
        var s = $(this).closest("div").find(".error-tab").text();
        var mes = "Telephone number not valid! ";

        /* Check the length */
        if (phone.match(/\d{2}-\d{8}|\d{3}-\d{8}|\d{10}|\d{11}/) == null) {
            if (s.search(mes) < 0) s += mes;
            $(this).text("null");
            $(this).closest("div").find(".callout").show();
        }
        else {
            s = s.replace(mes, "");    //replace() return the cut string back
            if (s == "") $(this).closest("div").find(".callout").hide();
        }
        $(this).closest("div").find(".error-tab").text(s);
    });

    $(".mobilephone").blur(function () {

        var phone = $(this).text();
        var s = $(this).closest("div").find(".error-tab").text();
        var mes = "Mobile phone number not valid! ";

        /* Check the length */
        if (phone.match(/(86)*0*13\d{9}/) == null) {
            if (s.search(mes) < 0) s += mes;
            $(this).text("null");
            $(this).closest("div").find(".callout").show();
        }
        else {
            s = s.replace(mes, "");    //replace() return the cut string back
            if (s == "") $(this).closest("div").find(".callout").hide();
        }
        $(this).closest("div").find(".error-tab").text(s);
    });

    $(".OICQ").blur(function () {

        var qq = $(this).text();
        var s = $(this).closest("div").find(".error-tab").text();
        var mes = "QQ number not valid! ";

        /* Check the length */
        if (isNaN(qq)) {
            if (s.search(mes) < 0) s += mes;
            $(this).text("null");
            $(this).closest("div").find(".callout").show();
        }
        else {
            s = s.replace(mes, "");    //replace() return the cut string back
            if (s == "") $(this).closest("div").find(".callout").hide();
        }
        $(this).closest("div").find(".error-tab").text(s);
    });

    $(".email").blur(function () {

        var email = $(this).text();
        var s = $(this).closest("div").find(".error-tab").text();
        var mes = "Email address not valid! ";
        var emailPat = /^(.+)@(.+)$/;

        /* Check the length */
        if (email.match(emailPat) == null) {
            if (s.search(mes) < 0) s += mes;
            $(this).text("null");
            $(this).closest("div").find(".callout").show();
        }
        else {
            s = s.replace(mes, "");    //replace() return the cut string back
            if (s == "") $(this).closest("div").find(".callout").hide();
        }
        $(this).closest("div").find(".error-tab").text(s);
    });
});

