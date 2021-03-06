import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions/productActions';
class ProductModal extends Component {
    state = {
        modal: false,
        productId: 0,
        title: '',
        discription: '',
        price: 0,
        priceVND: '',
        cashVND: '',
        msg: ''
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.clearState()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            productId: this.state.productId,
            title: this.state.title,
            description: this.state.description,
            price: this.state.price

        }

        //add product via addproduct action
        this.props.addNewProduct(newProduct);
        //this.toggle();
    }

    clearState = () => {
        this.setState({
            productId: 0,
            title: '',
            description: '',
            price: 0,
            priceVND: '',
            cashVND: '',
            msg: ''
        })
    }

    convertNumberToVND = (SoTien) => {
        var ChuSo = [" không", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín"];
        var Tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];

        //1. Hàm đọc số có ba chữ số;
        function DocSo3ChuSo(baso) {
            var tram;
            var chuc;
            var donvi;
            var KetQua = "";
            tram = parseInt(baso / 100);
            chuc = parseInt((baso % 100) / 10);
            donvi = baso % 10;
            if (tram === 0 && chuc === 0 && donvi === 0) return "";
            if (tram !== 0) {
                KetQua += ChuSo[tram] + " trăm";
                if ((chuc === 0) && (donvi !== 0)) KetQua += " linh";
            }
            if ((chuc !== 0) && (chuc !== 1)) {
                KetQua += ChuSo[chuc] + " mươi";
                if ((chuc === 0) && (donvi !== 0)) KetQua = KetQua + " linh";
            }
            if (chuc === 1) KetQua += " mười";
            switch (donvi) {
                case 1:
                    if ((chuc !== 0) && (chuc !== 1)) {
                        KetQua += " mốt";
                    }
                    else {
                        KetQua += ChuSo[donvi];
                    }
                    break;
                case 5:
                    if (chuc === 0) {
                        KetQua += ChuSo[donvi];
                    }
                    else {
                        KetQua += " lăm";
                    }
                    break;
                default:
                    if (donvi !== 0) {
                        KetQua += ChuSo[donvi];
                    }
                    break;
            }
            return KetQua;
        }

        //2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

        var DocTienBangChu = (SoTien) => {
            var lan = 0;
            var i = 0;
            var so = 0;
            var KetQua = "";
            var tmp = "";
            var ViTri = new Array([]);
            if (SoTien < 0) return "Số tiền âm !";
            if (SoTien === 0) return "Không đồng !";
            if (SoTien > 0) {
                so = SoTien;
            }
            else {
                so = -SoTien;
            }
            if (SoTien > 8999999999999999) {
                //SoTien = 0;
                return "Số quá lớn!";
            }
            ViTri[5] = Math.floor(so / 1000000000000000);
            if (isNaN(ViTri[5]))
                ViTri[5] = "0";
            so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
            ViTri[4] = Math.floor(so / 1000000000000);
            if (isNaN(ViTri[4]))
                ViTri[4] = "0";
            so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
            ViTri[3] = Math.floor(so / 1000000000);
            if (isNaN(ViTri[3]))
                ViTri[3] = "0";
            so = so - parseFloat(ViTri[3].toString()) * 1000000000;
            ViTri[2] = parseInt(so / 1000000);
            if (isNaN(ViTri[2]))
                ViTri[2] = "0";
            ViTri[1] = parseInt((so % 1000000) / 1000);
            if (isNaN(ViTri[1]))
                ViTri[1] = "0";
            ViTri[0] = parseInt(so % 1000);
            if (isNaN(ViTri[0]))
                ViTri[0] = "0";
            if (ViTri[5] > 0) {
                lan = 5;
            }
            else if (ViTri[4] > 0) {
                lan = 4;
            }
            else if (ViTri[3] > 0) {
                lan = 3;
            }
            else if (ViTri[2] > 0) {
                lan = 2;
            }
            else if (ViTri[1] > 0) {
                lan = 1;
            }
            else {
                lan = 0;
            }
            for (i = lan; i >= 0; i--) {
                tmp = DocSo3ChuSo(ViTri[i]);
                KetQua += tmp;
                if (ViTri[i] > 0) KetQua += Tien[i];
                if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
            }
            if (KetQua.substring(KetQua.length - 1) === ',') {
                KetQua = KetQua.substring(0, KetQua.length - 1);
            }
            KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + ' đồng';
            return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
        }
        return DocTienBangChu(SoTien);
    }

    componentDidUpdate(nextprops) {
        var { price, cash } = this.state
        var priceVND = this.convertNumberToVND(price)
        var cashVND = this.convertNumberToVND(cash)
        if (priceVND !== this.state.priceVND && price)
            this.setState({
                priceVND
            })
        if (cashVND !== this.state.cashVND && cash)
            this.setState({
                cashVND
            })

        const { errorProduct, isCreateSuccess } = this.props;

        if (errorProduct !== nextprops.errorProduct) {
            console.log(errorProduct.msg)
            if (errorProduct.id === 'ADD_PRODUCT_FAIL') {
                this.setState({ msg: errorProduct.msg })
            } else {
                this.setState({ msg: null })
            }
        }
        if (isCreateSuccess) {
            this.toggle();
            this.props.clearAction();
        }
    }

    render() {
        var { isAuthenticated } = this.props;
        var { productId, title, description, price, msg, priceVND } = this.state;
        return (
            <div>
                {isAuthenticated ? (<Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Add Product</Button>) : <h4>Please login to add Product</h4>}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >Tạo sảm phẩm mới
                    </ModalHeader>
                    <ModalBody>
                        {msg ? (<Alert color="danger">{msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>></InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="number"
                                        name="productId"
                                        id="productId"
                                        placeholder="productId"
                                        value={productId}
                                        onChange={this.onChange}
                                    ></Input>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>></InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Tên sản phẩm"
                                        value={title}
                                        onChange={this.onChange}
                                    ></Input>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Discription</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="textArea"
                                        name="description"
                                        id="description"
                                        value={description}
                                        onChange={this.onChange}
                                    >
                                    </Input>
                                </InputGroup>
                                <Label for="product">
                                    Giá: {priceVND !== null ? priceVND : null}
                                </Label>
                                <Input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={this.onChange}
                                    className='mb-3'
                                ></Input>
                                <Button
                                    type="submit"
                                    color="dark"
                                    block
                                    style={{ marginBottom: '2rem' }}
                                    onClick={this.onSubmit}
                                >Tạo sản phẩm</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNewProduct: (newProduct) => {
            dispatch(actions.addProduct(newProduct))
        },
        clearAction: () => {
            dispatch(actions.clearAction())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        isAuthenticated: state.auth.isAuthenticated,
        errorProduct: state.errorProduct,
        isCreateSuccess: state.products.isCreateSuccess
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
