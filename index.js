function replaceURLWithHTMLLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
  return text.replace(exp,"<a href='$1'>$1</a>");
}

$(function() {
  jQuery.ajax(facebookFeedConfig.scriptDirectory + '/index.php').done(function(posts) {
    if (posts) {
      $(posts).each(function(){
        var post = $("<li class='socialmediapost'>").appendTo($('#socialmedia'));

        if (this.full_picture || facebookFeedConfig.defaultImage) post.append(
          "<div class='socialmediaimage' style='background-image:url(" + (this.full_picture || facebookFeedConfig.defaultImage) + ")'></div>"
        );

        if (this.message && facebookFeedConfig.showMessage) {
          var message, linkedMessage = this.message ? replaceURLWithHTMLLinks(this.message) : '';
          if (!facebookFeedConfig.messageMaxCharacters || linkedMessage.length <= facebookFeedConfig.messageMaxCharacters) {
            message = linkedMessage;
          } else {
            var trimmedMessage = linkedMessage.substring(0, facebookFeedConfig.messageMaxCharacters);
            var lastSpaceIndex = trimmedMessage.lastIndexOf(' ');
            message = trimmedMessage.substring(0, lastSpaceIndex) + '...';
          }
          post.append("<div class='socialmediacontent'>");
          post.append("<div class='message'>" + message + "</div>");
        }

        if (this.link) post.append("<span class='socialmedialink'><a href=" + this.link + " target='_blank'>" + (this.name ? this.name : "Read more") + "</a></span>");

        if (facebookFeedConfig.showDate) {
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

