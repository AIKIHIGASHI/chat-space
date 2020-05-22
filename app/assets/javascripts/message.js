$(function(){

  function buildMessage(message){
      let html = `<div class="message">
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
});