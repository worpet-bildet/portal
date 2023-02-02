```json
[
  {
    "add": {
      "p": "~zod",
      "q": "other",
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
        "other": "null"
      }
    }
  },
  {
    "edit": {
      "id": {
        "p": "~zod",
        "q": "other",
        "r": "~2000.1.1"
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
        "other": "null"
      }
    }
  },
  {
    "sub": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      }
    }
  },
  {
    "del": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      }
    }
  },
  {
    "comment": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      },
      "text": "This is a comment."
    }
  },
  {
    "edit-comment": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      },
      "created-at": "~2000.1.1",
      "text": "This is a comment."
    }
  },
  {
    "del-comment": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      },
      "created-at": "~2000.1.1"
    }
  },
  {
    "rate": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      },
      "rating-num": 5
    }
  },
  {
    "unrate": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      }
    }
  },
  {
    "review": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      },
      "text": "This is a review.",
      "hash": "0x1234",
      "is-safe": false
    }
  },
  {
    "review": {
      "pointer": {
        "points-to-item": true,
        "id": {
          "p": "~zod",
          "q": "other",
          "r": "~2000.1.1"
        }
      }
    }
  },
  {
    "join-group": {
      "pointer": {
        "points-to-item": false,
        "id": {
          "p": "~rondev",
          "q": "group",
          "r": "group-discovery"
        }
      }
    }
  }
]
```
