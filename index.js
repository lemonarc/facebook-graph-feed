function replaceURLWithHTMLLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  return text.replace(exp,"<a href='$1'>$1</a>");
}

var config = {
  showMessage: true,
  messageMaxCharacters: 100,
  defaultImage: 'http://lorempixel.com/400/200',
  showDate: false
};

$(function() {
  jQuery.ajax('index.php').done(function(posts) {
    if (posts) {
      $(posts).each(function(){
        var post = $("<li class='socialmediapost'>").appendTo($('#socialmedia'));

        if (this.full_picture || config.defaultImage) post.append(
          "<div class='socialmediaimage' style='background-image:url(" + (this.full_picture || config.defaultImage) + ")'></div>"
        );

        if (this.message && config.showMessage) {
          var message, linkedMessage = this.message ? replaceURLWithHTMLLinks(this.message) : '';
          if (!config.messageMaxCharacters || linkedMessage.length <= config.messageMaxCharacters) {
            message = linkedMessage;
          } else {
            var trimmedMessage = linkedMessage.substring(0, config.messageMaxCharacters);
            var lastSpaceIndex = trimmedMessage.lastIndexOf(' ');
            message = trimmedMessage.substring(0, lastSpaceIndex) + '...';
          }
          post.append("<div class='socialmediacontent'>");
          post.append("<div class='message'>" + message + "</div>");
        }

        if (this.link) post.append("<span class='socialmedialink'><a href=" + this.link + " target='_blank'>" + (this.name ? this.name : "Read more") + "</a></span>");

        if (config.showDate) {
          var createdTime = new Date(this.created_time);
          post.append("<p class='socialmediadate'>" + createdTime.toLocaleDateString('en-gb', {
              day: "2-digit", month: "2-digit", year: "numeric"
          }) + "</p>");
        }

        post.append("</li>");
      });
    }
  });
});

