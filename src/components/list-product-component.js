import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
const endPointUrlLocal = 'http://localhost:4000/Products/';
const endPointUrlServer = 'http://ec2-18-221-184-183.us-east-2.compute.amazonaws.com:4000/Products/';
const endPointUrl = endPointUrlServer;

const LoopProduct = props => (    
    <tr>
        <td style={{width:'100px'}}>
            <img 
                src={ props.item.product_image } 
                alt={props.item.product_name} 
                className="img-fluid img-thumbnail"
                style={{width:'100%'}}
            />
        </td>
        <td>{props.item.product_name}</td>
        <td>{props.item.product_description}</td>
        <td>{props.item.product_price}</td>
        <td>{props.item.product_offer}</td>
        <td>{props.item.product_usage}</td>
        <td>
            <Link to={"/edit/"+props.item._id}><FontAwesomeIcon icon={faEdit} /></Link> 
            <label 
                onClick={
                    () => {
                            if(window.confirm('Do you want to delete this product?')){
                                props.DeleteProduct(props.item._id)
                            }
                        }
                }
            >&nbsp;
            |&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} />
            </label>
        </td>
    </tr>
);




export default class ProductList extends Component {

    constructor(props){
        super(props);
        //this.DeleteProduct = this.DeleteProduct.bind(this);
        this.state={
            Products: []
        };
    }

    ApiCallForList = () => {
        //http://localhost:4000/Products
        //http://ec2-18-221-184-183.us-east-2.compute.amazonaws.com:4000
         axios.get(endPointUrl)
            .then(response => {
                this.setState({Products: response.data})
            })
            .catch(function(err){
                console.log(err);
            })
    }

    componentDidMount(){        
        this.ApiCallForList();
    }

    DeleteProduct = (id) => {
        console.log(id);
        //http://ec2-18-221-184-183.us-east-2.compute.amazonaws.com:4000

        axios.delete(endPointUrl + 'delete/'+id)
            .then(response=>{
                if(response.data.deleteStatus===1){
                    this.ApiCallForList();
                    console.log(response);
                }else{
                    console.log(response);
                }
            })
            .catch( err => {
                console.log(err);
            });
    };

    GetProducts = () => {
        return this.state.Products.map((item, i) => {
            return <LoopProduct item={item} key={i} DeleteProduct={this.DeleteProduct} />
        })
    };

    render () {
        return (
            <div style={{marginTop:20}}>
               <h3>Products List</h3>
               <table className="table table-image">
                    <thead>
                        <tr>
                            <th style={{width:'100px'}}>Thumbnail</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Offer</th>
                            <th>Usage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Products.length > 0 ? this.GetProducts() : <tr><td colSpan="5">No product found</td></tr> }
                    </tbody>
               </table>
            </div>
        )
    }
}