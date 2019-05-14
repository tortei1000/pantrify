import React, { Component } from 'react';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { connect } from 'react-redux'
import { createRecipeImage } from '../redux/auth_reducer'


class AmazonS3 extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      url: '',
      
    };
  }

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
        this.props.createRecipeImage(this.state.url)


      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        console.log(err)
        
      });
  };

  render() {
    const { url, isUploading } = this.state;
    return (
      <div className="App">
        <h2>Upload Image</h2>
        <h4>{(url)? <>Image Uploaded Succesfully</> : null}</h4>
        <img src={url} alt="" width="300px" />

        <Dropzone
          onDropAccepted={this.getSignedRequest}
          style={{
            position: 'relative',
            width: 600,
            height: 200,
            borderWidth: 7,
            marginTop: 100,
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 28,
            
          }}
          accept="image/*"
          multiple={false}
          onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({ getRootProps }) => (
            <div {...getRootProps()}>
              {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
              
            </div>
          )}

        </Dropzone>
      </div>
    );
  }
}


const mapDispatchToProps = {
  createRecipeImage
}

const mapStateToProps = (reduxState) => {
  const { username, user_id } = reduxState
  return { username, user_id }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmazonS3)