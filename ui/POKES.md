```json
[
  {
    "add": {
      "ship": "~nus",
      "type": "/enditem/other",
      "general": {
        "title": "Some Title",
        "link": "https://website-thing.com",
        "description": "Some description.",
        "tags": ["tag1", "tag2"],
        "properties": {},
        "pictures": ["https://pic1.com", "https://pic2.com"],
        "image": "https://square-image.com",
        "color": "#e8e8e8"
      },
      "bespoke-input": {
        "enditem-other": ""
      }
    }
  },
  {
    "edit": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      },
      "general": {
        "title": "Some Title",
        "link": "https://website-thing.com",
        "description": "Some description.",
        "tags": ["tag1", "tag2"],
        "properties": {},
        "pictures": ["https://pic1.com", "https://pic2.com"],
        "image": "https://square-image.com",
        "color": "#e8e8e8"
      },
      "bespoke-input": {
        "enditem-other": ""
      }
    }
  },
  {
    "sub": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      }
    }
  },
  {
    "del": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      }
    }
  },
  {
    "comment": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      },
      "text": "This is a comment."
    }
  },
  {
    "edit-comment": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      },
      "created-at": "~2000.1.1",
      "text": "This is a comment."
    }
  },
  {
    "del-comment": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      },
      "created-at": "~2000.1.1"
    }
  },
  {
    "rate": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      },
      "rating-num": 5
    }
  },
  {
    "unrate": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      }
    }
  },
  {
    "review": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      },
      "text": "This is a review.",
      "hash": "0v1234",
      "is-safe": false
    }
  },
  {
    "del-review": {
      "key": {
        "ship": "~nus",
        "type": "/enditem/other",
        "cord": "~2000.1.1"
      }
    }
  },
  {
    "join-group": {
      "key": {
        "ship": "~rondev",
        "type": "/nonitem/group",
        "cord": "group-discovery"
      }
    }
  },
  {
    "overwrite-list": {
      "key": {
        "ship": "~nus",
        "type": "/list/nonitem/group",
        "cord": "~2000.1.1"
      },
      "key-text-list": [
      { "key": {
          "ship": "~rondev",
          "type": "/nonitem/group",
          "cord": "group-discovery"
        },
        "text": "group-discovery is great!"
        },
      { "key":  {
          "ship": "~bitbet-bolbel",
          "type": "/nonitem/group",
          "cord": "urbit-community"
        },
        "text": "urbit-community is lit!"
      }
      ]
    }
  }
]
```
```json
app bespoke-input
{
  "enditem-app": {
    "dist-desk": "~nus/app"
  }
}
```
