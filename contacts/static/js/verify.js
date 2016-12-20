/**
 * Created by YeWenting on 2016/11/13.
 */

/******************
 * TODO:
 *      链接数据库后，对于非法操作要复原其原来数据。
 */


$(document).ready(function () {

    $.alert({
        title: '提示信息',
        content: "助教您好！本通讯录实现了增删改查，使用方法：<br><br>增：点击全部联系人旁边的加号<br>删：点击联系人旁的图标<br>改：点击" +
        "联系人旁图标，再次点击提交修改(ajax)<br>查：在左边栏的搜索框输入名字",
        icon: 'fa fa-fw fa-check-square-o',
        animation: 'zoom',
        closeAnimation: 'zoom',
        buttons: {
            okay: {
                text: 'Okay',
                btnClass: 'btn-primary',
                keys: ['enter']
                }
            }
        });

    $(".delete-button").on("click", function () {
        this_person = $(this).closest("li");
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
                        $.post("delete/", {name: this_name},
                            function (data, status) {
                                if (data.message == 'success')
                                    $.alert({
                                        title: 'SUCCESS',
                                        content: 'The specific person has been deleted.',
                                        icon: 'fa fa-fw fa-check-square-o',
                                        animation: 'zoom',
                                        closeAnimation: 'zoom',
                                        buttons: {
                                            okay: {
                                                text: 'Okay',
                                                btnClass: 'btn-primary',
                                                action: function () {
                                                    this_person.remove();
                                                },
                                                keys: ['enter']
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
                                                btnClass: 'btn-primary',
                                                keys: ['enter']
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

    $(".edit-button").click(function () {

        this_person = $(this).closest("li");
        old_name = $(this).closest("div").find(".name").text();
        $(this).closest("div").find(".contact-message").attr("contenteditable", "true");
        var button = $("<i></i>").attr("class", "fa fa-fw fa-check-square-o check-button");
        $(this).after(button);

        var content = "You can edit " + $(this).closest("div").find(".name").text() + "'s info now.";
        $.alert({
            title: 'Edit',
            content: content,
            icon: 'fa fa-fw fa-circle-o',
            animation: 'zoom',
            closeAnimation: 'zoom',
            buttons: {
                okay: {
                    text: 'Okay',
                    btnClass: 'btn-primary',
                    keys: ['enter']
                }
            }
        });
        $(this).remove();

        $(".check-button").click(function () {
            newName = $(this).closest("div").find(".name").text();
            newGender = $(this).closest("div").find(".gender").text();
            newTelephone = $(this).closest("div").find(".telephone").text();
            newMobile = $(this).closest("div").find(".mobilephone").text();
            newAddress = $(this).closest("div").find(".location").text();
            newQQ = $(this).closest("div").find(".OICQ").text();
            newEmail = $(this).closest("div").find(".email").text();
            $.post("edit/", {
                    old_name: old_name, new_name: newName, new_gender: newGender, new_telephone: newTelephone,
                    new_mobile: newMobile, new_address: newAddress, new_qq: newQQ, new_email: newEmail
                },
                function (data, status) {
                    if (data.message == 'success')
                        $.alert({
                            title: 'SUCCESS',
                            content: "The specific person's info has been updated.",
                            icon: 'fa fa-fw fa-check-square-o',
                            animation: 'zoom',
                            closeAnimation: 'zoom',
                            buttons: {
                                okay: {
                                    text: 'Okay',
                                    btnClass: 'btn-primary',
                                    keys: ['enter']
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
                                    btnClass: 'btn-primary',
                                    keys: ['enter']
                                }
                            }
                        });
                });

            window.location.reload();
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
    })
});

