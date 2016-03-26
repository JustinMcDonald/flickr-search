
var SearchField = React.createClass({
  submitSearch: function() {
    this.props.onSearchChange(this.state.searchText);
  },
  handleKeyPress: function(e) {
    if (e.key === 'Enter') {
      this.submitSearch();
    }
  },
  getInitialState: function() {
    return {searchText: ''};
  },
  handleTextChange: function(e) {
    this.setState({searchText: e.target.value});
  },
  render: function() {
    return (
      <div className="input-group">
        <input 
          type="text" 
          className="form-control" 
          placeholder="What are you looking for?"
          value={this.props.searchText}
          onKeyPress={this.handleKeyPress} 
          onChange={this.handleTextChange} />
        <span className="input-group-btn">
          <button 
            type="button" 
            className="btn btn-default btn-secondary"
            onClick={this.submitSearch}>Search
          </button>
        </span>
      </div>
    );
  }
});

var Header = React.createClass({
  onSearchChange: function(search) {
    this.props.onSearchChange(search);
  },
  render: function() {
    var headline = "Explore the World's Largest Image Sharing Repository";
    return (
      <div className="header">
        <h1>{headline}</h1>
        <div className="col-md-4 col-md-offset-4">
          <SearchField 
            onSearchChange={this.onSearchChange} />
        </div>
      </div>
    );
  }
});

var ResultDisplaySizeField = React.createClass({
  render: function() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Display {this.props.resultDisplaySize} Results
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li><a href="javascript:void(0);" onClick={this.props.onDisplaySizeChange.bind(null, 10)}>10 results</a></li>
          <li><a href="javascript:void(0);" onClick={this.props.onDisplaySizeChange.bind(null, 20)}>20 results</a></li>
          <li><a href="javascript:void(0);" onClick={this.props.onDisplaySizeChange.bind(null, 50)}>50 results</a></li>
          <li><a href="javascript:void(0);" onClick={this.props.onDisplaySizeChange.bind(null, 100)}>100 results</a></li>
        </ul>
      </div>
    );
  }
});

var OrderByDateField = React.createClass({
  handleOrderByDateChange: function(orderType) {
    if (orderType == "date-posted-desc") this.setState({dropdownText: "Newest First"});
    else if (orderType == "date-posted-asc") this.setState({dropdownText: "Oldest First"});
    this.props.onOrderByDateChange(orderType);
  },
  getInitialState: function() {
    return {dropdownText: "Newest First"};
  },
  render: function() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {this.state.dropdownText}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><a href="javascript:void(0);" onClick={this.handleOrderByDateChange.bind(null, "date-posted-desc")}>Newest First</a></li>
          <li><a href="javascript:void(0);" onClick={this.handleOrderByDateChange.bind(null, "date-posted-asc")}>Oldest First</a></li>
        </ul>
      </div>
    );
  }
});

var MaxUploadTimeField = React.createClass({
  handleMaxUploadTimeChange: function(maxUploadTime) {
    if (maxUploadTime == null) this.setState({dropdownText: "Upload Date"});
    else if (maxUploadTime == "week") this.setState({dropdownText: "Upload Date (week)"});
    else if (maxUploadTime == "month") this.setState({dropdownText: "Upload Date (month)"});
    else if (maxUploadTime == "year") this.setState({dropdownText: "Upload Date (year)"});
    this.props.onMaxUploadTimeChange(maxUploadTime);
  },
  getInitialState: function() {
    return {dropdownText: "Upload Date"};
  },
  render: function() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {this.state.dropdownText}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
          <li><a href="javascript:void(0);" onClick={this.handleMaxUploadTimeChange.bind(null, null)}>Anytime</a></li>
          <li><a href="javascript:void(0);" onClick={this.handleMaxUploadTimeChange.bind(null, "week")}>Past Week</a></li>
          <li><a href="javascript:void(0);" onClick={this.handleMaxUploadTimeChange.bind(null, "month")}>Past Month</a></li>
          <li><a href="javascript:void(0);" onClick={this.handleMaxUploadTimeChange.bind(null, "year")}>Past Year</a></li>
        </ul>
      </div>
    );
  }
});

var FilterContainer = React.createClass({
  render: function() {
    var realResultDisplaySize = Math.min(this.props.resultDisplaySize, this.props.resultSize);
    return (
      <div className="row filter-wrapper">
        <div className="col-md-8">
          <ResultDisplaySizeField 
            resultDisplaySize={this.props.resultDisplaySize}
            onDisplaySizeChange={this.props.onDisplaySizeChange} />
          <OrderByDateField 
            onOrderByDateChange={this.props.onOrderByDateChange} />
          <MaxUploadTimeField 
            onMaxUploadTimeChange={this.props.onMaxUploadTimeChange} />
        </div>
        <div className="col-md-4 results-description">
          Displaying {realResultDisplaySize} of {this.props.resultSize} results.
        </div>
      </div>
    );
  }
});

var ImageResult = React.createClass({
  render: function() {
    var s = "url(" + this.props.src + ")";
    var target = "#" + this.props.modalId;
    return (
      <div className="col-md-3 image-wrapper">
        <div 
          className="image" 
          title={this.props.title} 
          style={{backgroundImage: s}}
          data-toggle="modal"
          data-target={target}
        >
        </div>
        <div id={this.props.modalId} className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{this.props.title}</h4>
              </div>
              <div className="modal-body">
                <img alt={this.props.title} src={this.props.src} width="100%" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ResultContainer = React.createClass({
  render: function() {
    if (this.props.data.photos && this.props.data.photos.photo) {
      var imageNodes = this.props.data.photos.photo.slice(0, this.props.resultDisplaySize).map(function(image) {
        var src = "https://farm"+image.farm+".staticflickr.com/"+image.server+"/"+image.id+"_"+image.secret+".jpg";
        return (
          <ImageResult key={image.id} title={image.title} src={src} modalId={image.id} />
        );
      });
      return (
        <div className="row">
          <img src="/img/loading.gif" alt="Loading.." id="loading" />
          {imageNodes}
        </div>
      );
    } else return null;
  }
});

var BodyContainer = React.createClass({
  render: function() {
    return (
      <div className="col-md-10 col-md-offset-1">
        <FilterContainer 
          onDisplaySizeChange={this.props.onDisplaySizeChange} 
          onOrderByDateChange={this.props.onOrderByDateChange}
          onMaxUploadTimeChange={this.props.onMaxUploadTimeChange}
          resultDisplaySize={this.props.resultDisplaySize}
          resultSize={this.props.resultSize} />
        <ResultContainer 
          data={this.props.data}
          resultDisplaySize={this.props.resultDisplaySize} />
      </div>
    );
  }
});

var ContentContainer = React.createClass({
  fetchFlickrImages: function() {
    $("#loading").fadeIn();
    var orderByDate = (this.state.orderType) ? "&sort=" + this.state.orderType : "";
    var d = new Date();
    switch(this.state.maxUploadTime) {
      case "week":
        var maxUploadTime = "&min_upload_date=" + (d.setDate(d.getDate() - 7) / 1000);
        break;
      case "month":
        var maxUploadTime = "&min_upload_date=" + (d.setMonth(d.getMonth() - 1) / 1000);
        break;
      case "year":
        var maxUploadTime = "&min_upload_date=" + (d.setFullYear(d.getFullYear() - 1) / 1000);
        break;
      default:
        var maxUploadTime = "";
        break;
    }
    var url = this.props.url + "&format=json&nojsoncallback=1&api_key=" + this.props.apikey + "&text=" + this.state.search + orderByDate + maxUploadTime;
    console.log(url);
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        var resultSize = 0;
        if (data.photos && data.photos.photo) resultSize = data.photos.photo.length; 
        this.setState({data: data, resultSize: resultSize});
        $("#loading").fadeOut();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        $("#loading").fadeOut();
      }.bind(this)
    });
  },
  handleSearchChange: function(search) {
    this.state.search = search;
    this.fetchFlickrImages();
  },
  handleDisplaySizeChange: function(resultDisplaySize) {
    this.setState({resultDisplaySize: resultDisplaySize});
    this.fetchFlickrImages();
  },
  handleOrderByDateChange: function(orderType) {
    this.state.orderType = orderType;
    this.fetchFlickrImages();
  },
  handleMaxUploadTimeChange: function(maxUploadTime) {
    this.state.maxUploadTime = maxUploadTime;
    this.fetchFlickrImages();
  },
  getInitialState: function() {
    return {data: [], resultDisplaySize: 10, resultSize: 0, orderType: false, maxUploadTime: false, search: ''};
  },
  render: function() {
    return (
      <div className="content">
        <Header onSearchChange={this.handleSearchChange} />
        <BodyContainer 
          onDisplaySizeChange={this.handleDisplaySizeChange} 
          onOrderByDateChange={this.handleOrderByDateChange}
          onMaxUploadTimeChange={this.handleMaxUploadTimeChange}
          data={this.state.data}
          resultDisplaySize={this.state.resultDisplaySize}
          resultSize={this.state.resultSize} />
      </div>
    );
  }
});

ReactDOM.render(
  <ContentContainer 
    url="https://api.flickr.com/services/rest/?method=flickr.photos.search" 
    apikey="d2b8d099597639d10400a74fafb491b7" />,
  document.getElementById('content')
);
