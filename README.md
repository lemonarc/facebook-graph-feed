# facebook-graph-feed
A small Javascript and PHP component to display a Facebook page feed on a website.

## Requirements

Requires jQuery for now (will try and get rid of this dependency soon).

## Setup

You need to have created a Facebook app to get an app ID and secret: https://developers.facebook.com/apps/ 

Copy .env.example to a file called .env in the same folder and update your environment variables as required:

```
# Your app ID from your facebook app
APP_ID=1111111111111

# Your app secret from your facebook app
APP_SECRET=abcdef1234567890

# The page you want to display the feed for (this unique ID is in the URL of the page)
PAGE_NAME=MyFacebookPage

# The max number of recent posts to display (defaults to 12)
POST_LIMIT=12
```

## Usage

Place all the contents of this project (including your new .env file) in a folder on your website, and include on the page you want to use as so:

```html

    <script type="text/javascript">
        facebookFeedConfig = {
          scriptDirectory: '/facebook',
          showMessage: false,
          messageMaxCharacters: 100,
          defaultImage: 'http://lorempixel.com/400/200',
          showDate: false
        }
    </script>
    <script src="/facebook/index.js" type="text/javascript"></script>
    
```

## Config Options:

| Option               | Default       | Description  |
| -------------------- | ------------- | ------------ |
| scriptDirectory      |               | REQUIRED: The public location of this folder. In the above example it is '/facebook' |
| showMessage          | false         | Whether or not to show the message field |
| messageMaxCharacters |               | The max characters to show of the message (message will be truncated) |
| defaultImage         |               | Image to display when there is no image field |
| showDate             | false         | Whether or not to show the date |

