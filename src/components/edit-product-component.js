import React, {Component} from 'react';
import axios from 'axios';
const endPointUrlLocal = 'http://localhost:4000/Products/';
const endPointUrlServer = 'http://ec2-18-221-184-183.us-east-2.compute.amazonaws.com:4000/Products/';
const endPointUrl = endPointUrlServer;

export default class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_description: '',
            product_price: '',
            product_usage: '',
            product_offer: '',
            product_image: '',
            preview_image: '',
            onChangeFileAction: false,
            product_name_error: '',
            product_description_error: '',
            product_price_error: '',
            product_usage_error: '',
            product_offer_error: '',
            product_image_error: ''
        }
    }

    ApiCallForLoad = () => {
        //http://ec2-18-221-184-183.us-east-2.compute.amazonaws.com:4000/Products/
        axios.get(endPointUrl+this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_name: response.data.product_name,
                    product_description: response.data.product_description,
                    product_price: response.data.product_price,
                    product_usage: response.data.product_usage,
                    product_offer: response.data.product_offer,
                    product_image: response.data.product_image
                });
                
            })
            .catch (err => {
                console.log(err);
            });
    }

    componentDidMount(){
        //console.log('Product_id: ' + this.props.match.params.id);
        this.ApiCallForLoad();
    }

    onChangeProductName = (e) => {
        this.setState({
            product_name: e.target.value
        })
    }

    onChangeProductDescription = (e) => {
        this.setState({ 
            product_description: e.target.value
        })
    }

    onChangeProductPrice = (e) => {
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductUsage = (e) => {
        this.setState({
            product_usage: e.target.value
        });
    }

    onChangeProductOffer = (e) => {
        this.setState({
            product_offer: e.target.value
        });
    }

    onFileChange = event => {
        //console.log(event.target.files[0]);
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                product_image: file,
                preview_image: reader.result,
                onChangeFileAction: true
            });
        }
        reader.readAsDataURL(file);
        console.log(this.state.preview_image);
       /* this.setState({
            product_image: event.target.files[0]
        });*/
    }

    handleValidation = () => {
        let product_name_error = "";
        let product_description_error = "";
        let product_price_error = "";
        let product_offer_error = "";
        let product_usage_error = "";
        let product_image_error = "";

        if(!this.state.product_name){
            product_name_error = "Name cannot be empty";
        }
        if(!this.state.product_description){
            product_description_error = "Description cannot be empty";
        }
        if(!this.state.product_price){
            product_price_error = "Price cannot be empty";
        }        
        if(!this.state.product_offer){
            product_offer_error = "Offer cannot be empty";
        }        
        if(!this.state.product_usage){
            product_usage_error = "Usage cannot be empty";
        }
        if(!this.state.product_image){
            product_image_error = "Please select image";
        }

        if(product_name_error || product_description_error || product_price_error || product_offer_error || product_usage_error || product_image_error){
            this.setState({product_name_error,product_description_error,product_price_error,product_offer_error,product_usage_error,product_image_error});
            return false;
        }
        return true;
    }

    goBack = () => {
        this.props.history.push('/');
    }

    onSubmit = (e) => {
        e.preventDefault();
        //Checking user entered all fields
        if(!this.handleValidation()){
            console.log("Form has errors.")
        }else{
            let toggleImage = '';
            if(this.state.onChangeFileAction){
                toggleImage = this.state.preview_image;
            }else{
                toggleImage = this.state.product_image;
            }
            const newProduct = {
                product_name: this.state.product_name,
                product_description: this.state.product_description,
                product_price: this.state.product_price,
                product_offer: this.state.product_offer,
                product_usage: this.state.product_usage,
                product_image: toggleImage
            }
            //let newProduct = new FormData();
            /*newProduct.append('product_name', this.state.product_name);
            newProduct.append('product_description', this.state.product_description);
            newProduct.append('product_price', this.state.product_price);
            newProduct.append('product_offer', this.state.product_offer);
            newProduct.append('product_usage', this.state.product_usage);
            newProduct.append('product_image', this.state.product_image); */
            //http://ec2-18-221-184-183.us-east-2.compute.amazonaws.com:4000/Products
            axios.post(endPointUrl + 'update/'+this.props.match.params.id, newProduct)
                .then(res => {
                    if(res.data.updateStatus===1){
                        this.ApiCallForLoad();
                        console.log(res);
                    }else{
                        console.log(res);
                    }
                })
                .catch(error=>{
                    console.log('Error: ' + error);
                })
                this.props.history.push('/');
        }
    }

    render() {
        return (
            <div style={{marginTop:20, marginBottom:20}}>
                <h3>Edit Product<span className="back-button" onClick={this.goBack}>Back</span></h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.product_name}
                            onChange={this.onChangeProductName}
                        />
                        <span style={{color: "red"}}>{this.state.product_name_error}</span>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.product_description}
                            onChange={this.onChangeProductDescription}
                        />
                        <span style={{color: "red"}}>{this.state.product_description_error}</span>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.product_price}
                            onChange={this.onChangeProductPrice}
                        />
                        <span style={{color: "red"}}>{this.state.product_price_error}</span>
                    </div>
                    <div className="form-group">
                        <label>Offer</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.product_offer}
                            onChange={this.onChangeProductOffer}
                        />
                        <span style={{color: "red"}}>{this.state.product_offer_error}</span>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className="form-check-input"
                                name="friendlyOption"
                                id="friendly"
                                value="friendly"
                                checked={this.state.product_usage==='friendly'}
                                onChange={this.onChangeProductUsage}
                            />
                            <label className="form-check-label" htmlFor="friendly">Friendly Usage</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className="form-check-input"
                                name="mediumOption"
                                id="medium"
                                value="medium"
                                checked={this.state.product_usage==='medium'}
                                onChange={this.onChangeProductUsage}
                            />
                            <label className="form-check-label" htmlFor="medium">Medium Usage</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className="form-check-input"
                                name="riskOption"
                                id="risk"
                                value="risk"
                                checked={this.state.product_usage==='risk'}
                                onChange={this.onChangeProductUsage}
                            />
                            <label className="form-check-label" htmlFor="risk">Risk Usage</label>
                        </div>
                        <span style={{color: "red"}}>{this.state.product_usage_error}</span>
                    </div>
                    <div className="form-group">
                        <div className="custom-file">
                            <input type="file" name="product_image" className="custom-file-input" onChange={this.onFileChange} id="customFile"></input>
                            <label className="custom-file-label" htmlFor ="customFile">Choose file</label>
                        </div>
                        <span style={{color: "red"}}>{this.state.product_image_error}</span>
                    </div>
                    {
                        this.state.preview_image!=='' ?  
                            <div style={{textAlign:'center'}}>
                                <img
                                    className="img-fluid img-thumbnail"
                                    style={{"width":"25%"}}
                                    src={this.state.preview_image} 
                                    alt={this.state.product_name + ' image'}
                                />
                            </div>
                            : 
                            <div style={{textAlign:'center'}}>
                                <img
                                    className="img-fluid img-thumbnail"
                                    style={{"width":"25%"}}
                                    src={this.state.product_image} 
                                    alt={this.state.product_name + ' image'}
                                />
                            </div>
                    }
                    <div className="form-group">
                        <input type="submit" value="Update Product" className="btn btn-primary" />
                    </div> 
                </form>
            </div>
        )
    }
}