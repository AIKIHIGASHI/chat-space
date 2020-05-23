$(function(){

  function buildMessage(message){

      let html = 
      `<div class="message" data-message-id=${message.id}>
      <div>
      <div class="block">
      ${message.user_name}
      <span>
      ${message.created_at}
      </span>
      </div>
      <p class="lower-message__content">
      ${message.content}
      </p>`
    if(message.image){
      html += `</div><img src=${message.image}></div>`
      return html;
    }else{
      html
      return html;
    };
  }

  var reloadMessages = function() {

    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildMessage(message)
        });
        $('.chat-main__massage-list').append(insertHTML);
        $('.chat-main__massage-list').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $("#new_message").submit(function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");


    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function(message){
      let html = buildMessage(message);
      $(".chat-main__massage-list").append(html);
      $('.chat-main__massage-list').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});
      $('#new_message')[0].reset();
    })

    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    return false;
  });


  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});