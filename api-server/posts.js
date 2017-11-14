const clone = require('clone')

let db = {}

const defaultData = {
    "1db0f2ac-ae76-469a-951f-a1b70e74c877": {
        id: "1db0f2ac-ae76-469a-951f-a1b70e74c877",
        title: "Stuck in Limbo? Bitcoin Price Clocks 9-Day High",
        author: "Chip Snippets",
        category: "btc",
        timestamp: "2017-10-23T17:10:14.285Z",
        deleted: false,
        voteScore: 8,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.`
    },
    "72e6b3ec-5ba9-4d4d-ab0a-3c15cdcd2ad5": {
        id: "72e6b3ec-5ba9-4d4d-ab0a-3c15cdcd2ad5",
        title: "Japan's SBI Holdings Is Gearing Up to Mine Litecoin",
        author: "Anton Bargot",
        category: "ltc",
        timestamp: "2017-10-04T17:10:14.285Z",
        deleted: false,
        voteScore: 22,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "71c33bd8-2c8d-4546-b7d1-9be86e44302a": {
        id: "71c33bd8-2c8d-4546-b7d1-9be86e44302a",
        title: "Gates Foundation to Use Ripple Interledger Tech in Mobile Payments Push",
        author: "Johannes Meserlin",
        category: "xrp",
        timestamp: "2017-10-12T17:10:14.285Z",
        deleted: false,
        voteScore: 65,
        body: `Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "4b8427aa-2358-41e7-ac4c-fd73dc44fe98": {
        id: "4b8427aa-2358-41e7-ac4c-fd73dc44fe98",
        title: "Ripple Rebound? XRP Price Jumps to 7-Week High",
        author: "Anton Bargot",
        category: "xrp",
        timestamp: "2017-08-11T17:12:14.285Z",
        deleted: false,
        voteScore: 35,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "4107d76f-6621-40d9-8cda-b3b6a42df755": {
        id: "4107d76f-6621-40d9-8cda-b3b6a42df755",
        title: "Ether, Litecoin and More: Overstock Now Accepts Cryptocurrencies as Payment",
        author: "Chip Snippets",
        category: "ltc",
        timestamp: "2017-10-04T17:10:14.285Z",
        deleted: false,
        voteScore: 56,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "2d6a3310-44db-40c7-8d7b-b50a30692292": {
        id: "2d6a3310-44db-40c7-8d7b-b50a30692292",
        title: "Ethereum's Byzantium Hard Fork Is Running Smoothly, Developers Say",
        author: "Rose McGillacutty",
        category: "eth",
        timestamp: "2017-10-04T17:10:14.285Z",
        deleted: false,
        voteScore: 18,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "1c834d5b-ef0f-4763-aa3f-c6d16f7d83f4": {
        id: "1c834d5b-ef0f-4763-aa3f-c6d16f7d83f4",
        title: "SegWit in the Wild: 4 Lessons Bitcoin Can Learn from Litecoin",
        author: "Anton Bargot",
        category: "ltc",
        timestamp: "2017-10-04T17:10:14.285Z",
        deleted: false,
        voteScore: 73,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "d7847ff5-282b-48b7-a1d2-c72c98b139b4": {
        id: "d7847ff5-282b-48b7-a1d2-c72c98b139b4",
        title: "Circle Is Building a Master Mobile Payments Network on Ethereum",
        author: "Booju Banton",
        category: "eth",
        timestamp: "2016-08-04T17:08:32.285Z",
        deleted: false,
        voteScore: 6,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    },
    "7fd1f941-be79-4924-82fd-b5ec0ef31d69": {
        id: "7fd1f941-be79-4924-82fd-b5ec0ef31d69",
        title: "Why a Swedish MP Is Joining Bitcoin Exchange BTCX",
        author: "Barnacle Bill",
        category: "btc",
        timestamp: "2016-07-22T17:08:32.285Z",
        deleted: false,
        voteScore: 6,
        body: `Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.
            Proin tempor, metus eget tempor tincidunt, lectus quam tincidunt mauris, ut viverra nunc ante in eros. Cras luctus luctus elementum. Cras viverra bibendum placerat. Sed consectetur eleifend velit, non euismod sapien fringilla ac. Quisque consequat justo tristique, imperdiet augue et, feugiat ante. Etiam consequat nibh nunc, eget consequat libero interdum nec. Ut cursus efficitur augue, ut auctor risus malesuada at. In et lacinia ante, et blandit nunc. In nisl magna, laoreet eget ante vitae, tempor viverra leo. Quisque tincidunt eros in venenatis efficitur. Morbi vitae dui enim. Phasellus sollicitudin nisl et lacus consequat sagittis. Quisque quis malesuada lacus.
            Sed ac nisi erat. Fusce convallis vitae urna id vulputate. Etiam tempus ex in quam malesuada bibendum. Maecenas facilisis urna sed libero porttitor, nec sodales dolor tristique. In hac habitasse platea dictumst. Nullam nec sodales quam, quis dapibus arcu. Nullam efficitur nisi eu nulla tincidunt scelerisque. Fusce mollis quam quis mi maximus, quis euismod metus consectetur. Mauris non ultricies velit, et faucibus massa. Donec commodo nulla ut rutrum hendrerit. Morbi id augue congue, placerat purus vitae, elementum lectus. Sed eget dui quis massa tristique pulvinar at ut ligula. Donec rhoncus pharetra lectus, interdum tristique velit viverra non. Praesent nec diam laoreet diam placerat mattis id id sem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tincidunt nunc. Duis at nibh luctus, egestas tortor ac, sodales elit. Duis lacinia posuere urna, ut convallis turpis semper non. Nam placerat eleifend nisl, eget dapibus augue tincidunt sed. Mauris at accumsan turpis. Maecenas posuere volutpat felis vitae posuere. Integer rhoncus, eros at sodales fermentum, neque lectus consectetur urna, ac ullamcorper est sapien sit amet nisi. Praesent quis sodales mi, et euismod lectus. Praesent sed dictum risus. Ut pellentesque scelerisque tincidunt. Integer vitae nibh sed lectus eleifend pulvinar. Aliquam malesuada, tortor non molestie luctus, elit tortor tempor nisi, at scelerisque nisi diam a odio.
            Sed fermentum maximus justo in dignissim. Ut cursus vulputate gravida. Cras iaculis nulla enim, vel tempus tortor interdum sed. Maecenas pretium ligula est, sed mollis lacus lacinia ut. Nulla sit amet purus eu neque bibendum varius. Nullam tincidunt pretium sagittis. Aliquam posuere ipsum ac faucibus vehicula. Duis non leo neque. In consequat massa et finibus scelerisque. Suspendisse potenti. Morbi varius libero purus. In hac habitasse platea dictumst. Sed hendrerit varius tempus. Maecenas rhoncus sem tortor, a porttitor lacus interdum vitae. Curabitur eu ornare diam. Suspendisse ante leo, molestie id bibendum ut, tristique eget quam.
            Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.`
    }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {

    console.log("API :: post:add :: post: ", post);
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {

    console.log("vote :: id: ", id, "; option: ", option);

  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]

    console.log("vote :: post: ", post);

    switch(option) {
        case "upVote":
            console.log("vote :: post.voteScore: ", post.voteScore);
            post.voteScore = post.voteScore + 1
            console.log("vote :: post.voteScore: ", post.voteScore);
            break
        case "downVote":
            console.log("vote :: post.voteScore: ", post.voteScore);
            post.voteScore = post.voteScore - 1
            console.log("vote :: post.voteScore: ", post.voteScore);
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
