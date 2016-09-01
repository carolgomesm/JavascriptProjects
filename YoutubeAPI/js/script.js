//Search Bar handler

$(function(){
  var searchField = $('#query');
  var icon = $('#searchBtn');

  //Focus event handler
  $(searchField).on('focus', function(){
    $(this).animate({
      width:'100%'
    }, 400);

    $(icon).animate({
      right: '10px'
    }, 400);
  });

  //Blur event handler
  $(searchField).on('blur', function(){
    if(searchField.val() == ''){
      $(searchField).animate({
        width: '45%'
      }, 400, function(){});

      $(icon).animate({
        right: '410px'
      }, 400, function(){});
    }
  });

  $('#searchForm').submit(function(e){
    e.preventDefault();
  })
})

function search(){
  //Clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  //Tun Get REQUEST on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet,id',
      q: q,
      type: 'video',
      key: 'AIzaSyDeWIUtSXVW56FRcAJscN6b0hfxXK68MUk'}, function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item);

          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //Display buttons
        $('#buttons').append(buttons);
      });
}

//Next Page function
function nextPage(){
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('quey');
  //Clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  //Tun Get REQUEST on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet,id',
      q: q,
      pageToken : token,
      type: 'video',
      key: 'AIzaSyDeWIUtSXVW56FRcAJscN6b0hfxXK68MUk'}, function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item);

          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //Display buttons
        $('#buttons').append(buttons);
      });
}

//Previous Page function
function prevPage(){
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('quey');
  //Clear results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  //Tun Get REQUEST on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet,id',
      q: q,
      pageToken : token,
      type: 'video',
      key: 'AIzaSyDeWIUtSXVW56FRcAJscN6b0hfxXK68MUk'}, function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          var output = getOutput(item);

          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //Display buttons
        $('#buttons').append(buttons);
      });
}

//Build function
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build output string
  var output = '<li>' +
  '<div class="list-left">' +
  '<img src="'+ thumb +'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+ videoId +'">'+ title + '</a></h3>' +
  '<small>By <span class="cTitle">'+ channelTitle +'</span> on '+ videoDate +'</small>' +
  '<p>'+ description +'</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '';

  return output;

}

function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnOutput = '<div class="button-container">' +
    '<button id="next-button" class="paging-buttons" data-token="'+ nextPageToken +'" data-query="'+ q +'"' +
    'onclick="nextPage();">Next Page</button></div>';
  }else{
    var btnOutput = '<div class="button-container">' +
    '<button id="prev-button" class="paging-buttons" data-token="'+ prevPageToken +'" data-query="'+ q +'"' +
    'onclick="prevPage();">Previous Page</button>' +
    '<button id="next-button" class="paging-buttons" data-token="'+ nextPageToken +'" data-query="'+ q +'"' +
    'onclick="nextPage();">Next Page</button></div>';
  }
  return btnOutput;
}
