var Imap = require('imap'),
    inspect = require('util').inspect;
    var MailParser = require("mailparser").MailParser;
    var Promise = require("bluebird");

var imapConfig = {
    user: 'deneme1@xfxpositions.ml',
    password: 'deneme1',
    host: 'mail.xfxpositions.ml',
    port: 993,
    tls: true
};
var imap = new Imap(imapConfig);

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
 
}

imap.once('ready', function() {
  openInbox(function(err, box) {
    if (err) throw err;
    var f = imap.seq.fetch('1:3', {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        var buffer = '';
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function() {
          console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        });
      });
      msg.once('attributes', function(attrs) {
        //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
  imap.openBox('INBOX',function(err,result){
    console.log(result.messages)
    console.log('total messages = ' + result.messages.total)
    var f = imap.fetch('1:'+result.messages.total, { bodies: "" });
    f.on("message", processMessage);
    f.once("error", function(err) {
        return Promise.reject(err);
    });
    f.once("end", function() {
        console.log("Done fetching all unseen messages.");
        imap.end();
    });
})
});

function processMessage(msg, seqno) {
    console.log("Processing msg #" + seqno);
    //console.log(msg);
    
    var parser = new MailParser();
    parser.on("headers", function(headers) {
        console.log("Header: " + JSON.stringify(headers));
    });

    parser.on('data', data => {
        if (data.type === 'text') {
            //console.log(seqno);
            console.log(data);  /* data.html*/
        }

         if (data.type === 'attachment') {
           console.log(data.filename);
           data.content.pipe(process.stdout);
            data.content.on('end', () => data.release());
         }
     });

    msg.on("body", function(stream) {
        stream.on("data", function(chunk) {
            parser.write(chunk.toString("utf8"));
        });
    });
    msg.once("end", function() {
        // console.log("Finished msg #" + seqno);
        parser.end();
    });
}

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();