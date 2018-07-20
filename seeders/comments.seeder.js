var Seeder = require('mongoose-data-seed').Seeder;
var Comment = require('../server/datasource/schemas').Comment;

var data = [
  {
    _id: "53e12264b48b12793f000b84",
    ancestors: [],
    children: ["53e12507b48b12793f000b91"],
    createDate: "2014-08-05T18:28:52.692Z",
    createdBy: "53a43f7c729e9ef59ba7ebf2",
    isTrashed: false,
    label: "feedback",
    selection: "53e1223eb48b12793f000b81",
    submission: "53e1156db48b12793f00042d",
    text: " It helps to collaborate with someone!",
    useForResponse: true,
    workspace: "53e1156db48b12793f000442"
  } ,{
    _id: "53e12507b48b12793f000b91",
    ancestors: [],
    children: [],
    createDate: "2014-08-05T18:40:07.063Z",
    createdBy: "53a43f7c729e9ef59ba7ebf2",
    isTrashed: false,
    label: "feedback",
    selection: "53e12503b48b12793f000b90",
    submission: "53e1156db48b12793f00042d",
    text: "  It helps to collaborate with someone!",
    useForResponse: true,
    workspace: "53e1156db48b12793f000442"
  }, {
    _id: "53e37a4ab48b12793f00104c",
    ancestors: [],
    children: [],
    createDate: "2014-08-07T13:08:26.396Z",
    createdBy: "529518daba1cd3d8c4013344",
    isTrashed: false,
    label: "feedback",
    selection: "53e379dfb48b12793f00104a",
    submission: "53e36522729e9ef59ba7f4da",
    text: "I spoke with Michael about the balance between the specific contexts we are working on and the teaching issues and that he could continue to help articulate the teaching issues even as there is a focus on implementing pows and the software",
    useForResponse: true,
    workspace: "53e36522b48b12793f000d3b"
  }
];

var CommentsSeeder = Seeder.extend({
  shouldRun: function () {
    return Comment.count().exec().then(count => count === 0);
  },
  run: function () {
    return Comment.create(data);
  }
});

module.exports = CommentsSeeder;
