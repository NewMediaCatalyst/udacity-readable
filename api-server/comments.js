const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
    "8137ef37-ed5b-45dc-a160-7be1555703f9": {
        id: "8137ef37-ed5b-45dc-a160-7be1555703f9",
        parentId: "1c834d5b-ef0f-4763-aa3f-c6d16f7d83f4",
        author: "Ton ton123",
        timestamp: "2017-11-09T23:35:24.490Z",
        body: "123 Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.",
        voteScore: 4,
        deleted: false,
        parentDeleted: false
    },
    "b198ca3f-db85-4a0c-959e-c98660577840": {
        id: "b198ca3f-db85-4a0c-959e-c98660577840",
        parentId: "1c834d5b-ef0f-4763-aa3f-c6d16f7d83f4",
        author: "Ton ton456",
        timestamp: "2017-11-02T23:35:24.490Z",
        body: "123 Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.",
        voteScore: 7,
        deleted: false,
        parentDeleted: false
    },
    "e0ec4311-e13b-4a34-abaa-d4686f352fe3": {
        id: "e0ec4311-e13b-4a34-abaa-d4686f352fe3",
        parentId: "72e6b3ec-5ba9-4d4d-ab0a-3c15cdcd2ad5",
        author: "Ton ton 1",
        timestamp: "2017-10-12T17:10:14.285Z",
        body: "123 Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.",
        voteScore: 1,
        deleted: false,
        parentDeleted: false
    },
    "21583556-8b61-4728-ac13-fd83d05f5531": {
        id: "21583556-8b61-4728-ac13-fd83d05f5531",
        parentId: "1db0f2ac-ae76-469a-951f-a1b70e74c877",
        author: "Ton ton 2",
        timestamp: "2017-10-12T17:10:14.285Z",
        body: "456 Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.",
        voteScore: 55,
        deleted: false,
        parentDeleted: false
    },
    "8cc45236-b12e-49dc-a523-4d35f81a6098": {
        id: "8cc45236-b12e-49dc-a523-4d35f81a6098",
        parentId: "1db0f2ac-ae76-469a-951f-a1b70e74c877",
        author: "Ton ton 3",
        timestamp: "2017-10-12T17:10:14.285Z",
        body: "678 Praesent eu sagittis odio. Vivamus lacus urna, consequat non neque condimentum, tincidunt malesuada orci. Duis facilisis, leo sed tincidunt varius, nisl orci ornare ex, et accumsan quam odio vel eros. Etiam pellentesque tempus leo eget molestie. Morbi sit amet lacus ultricies est pulvinar volutpat. Donec eget quam quis tellus auctor dictum non tincidunt libero. Aenean cursus dictum mauris, vel venenatis lorem tincidunt a. Integer id enim interdum, malesuada nunc at, congue velit. Morbi molestie ac purus vitae maximus. Morbi ornare tellus sit amet felis convallis tempor. Nam dolor augue, efficitur sit amet enim luctus, volutpat efficitur mauris. Fusce sodales nunc non magna fermentum, nec rutrum sem blandit. Praesent tristique efficitur leo, sit amet egestas arcu elementum eu. Pellentesque vehicula nulla at est porta, eu maximus est ultricies. Mauris et orci quis elit semper congue in vel odio. Donec blandit eu turpis in mattis.",
        voteScore: 1,
        deleted: false,
        parentDeleted: false
    }
}


function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      posts.incrementCommentCounter(token, comments[id].parentId, -1)
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
