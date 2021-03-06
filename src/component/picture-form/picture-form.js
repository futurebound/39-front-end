import React from 'react';

const fileToDataURL = file => {
  return new Promise((resolve,reject) => {
    if(!file)
        return reject(new Error('File is required'));

    let reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error',reject);

    return reader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component{
  constructor(props){
    super(props);

    this.emptyState = {
      preview: undefined,

      photo: '',
      photoDirty: false,
      photoError: 'Picture is required.',

      description: '',
      descriptionDirty: false,
      descriptionError: 'Description is required.',
    };

    this.state = this.emptyState;

    let memberFunctions = Object.getOwnPropertyNames(PictureForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleValidate({type,value,files}){
    let validImageTypes = ['image/png','image/jpeg','image/jpg'];

    switch(type){
      case 'file':
        if(files.length !== 1) {
          console.log('handleValidate: description length error');
          return 'You must only select one file';
        }
        let imageType = files[0].type;

        if(!validImageTypes.includes(imageType)) {
          console.log('handleValidate: image type error');
          return 'The image must be a png or a jpg';
        }
        return null;
      case 'text':
        if(value.length < 10) {
          console.log('handleValidate: description length error');
          return 'You must have at least 10 characters';
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(event){
    let {type,value,files} = event.target;

    if(type === 'file'){
      let error = this.handleValidate(event.target);
      if(!error){
        console.log('handleChange: no error, calling fileToDataURL')
        fileToDataURL(files[0])
          .then(preview => this.setState({preview}))
          .catch(console.error);
      }
      this.setState({
        photo: files[0],
        photoError: error,
        photoDirty: true,
      });
    } else {
      this.setState({
        description: value,
        descriptionError : this.handleValidate(event.target),
        descriptionDirty: true,
      });
    }
  }

  handleSubmit(event){
    event.preventDefault();

    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  }

  render(){
    return(
      <form
        onSubmit={this.handleSubmit}
        className='photo-form'>

        <img style={{width:'200px'}} src={this.state.preview} />

        <p>{this.state.photoError}</p>
        <label>Photo</label>

        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />

        <p>{this.state.descriptionError}</p>
        <label>Description</label>

        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        />

        <button
          type='submit'>
          upload photo
        </button>
      </form>
    );
  }
}

export default PictureForm;