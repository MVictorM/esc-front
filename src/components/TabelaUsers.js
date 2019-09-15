import React, {Component} from 'react';
import axios from "axios";

class TabelaUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: {},
            urlUsers: 'http://localhost:3001/users/',
            loading: false
        };
    }

    componentDidMount() {
        this.carregarUsuarios();
    }

    carregarUsuarios = () => {
        this.setState({
            loading: true,
        });
        axios.get(this.state.urlUsers + 'listar/')
            .then(res => {
                this.setState({
                    loading: false,
                    users: res.data
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    };

    render() {
        if (this.state.loading) {
            return <h1>Carregando...</h1>
        } else {
            let linhasUsers = Object.keys(this.state.users).map(function (i) {
                return <tr key={this.state.users[i].id}>
                    <td className="align-middle">{this.state.users[i].id}</td>
                    <td className="align-middle">{this.state.users[i].nome}</td>
                    <td className="align-middle">{this.state.users[i].username}</td>
                    <td className="align-middle">{this.state.users[i].Perfil.nome}</td>
                </tr>
            }, this);
            return <div className="table-responsive" style={{display: linhasUsers.length > 0 ? 'block' : 'none'}}>
                <table className="table table-striped table-bordered table-hover small text-center m-0">
                    <thead className="text-white bg-secondary">
                    <tr>
                        <th className="text-center align-middle">ID</th>
                        <th className="align-middle">Nome</th>
                        <th className="align-middle">E-mail</th>
                        <th className="text-center align-middle">Perfil</th>
                    </tr>
                    </thead>
                    <tbody>
                    {linhasUsers}
                    </tbody>
                </table>
            </div>
        }
    }
}

export default TabelaUsers;