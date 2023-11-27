import React, { Component } from 'react';
import './index.css'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            searchText: '',
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        const { searchText } = this.state;

        try {
            const response = await fetch(`http://localhost:3001/v1/users?searchText=${searchText}`);
            const data = await response.json();

            if (response.ok) {
                // Check if the response is valid JSON
                this.setState({ users: data });
            } else {
                console.error('Server returned an error:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    handleSearch = () => {
        // Fetch users with search text
        this.fetchUsers();
    };

    render() {
        const { users, searchText } = this.state;

        return (
            <div className='mainDiv'>
                <h1 className='main-heading'>MERN Stack Assignment By Sukanya </h1>
                <div  className='searchDiv'>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchText}
                        onChange={(e) => this.setState({ searchText: e.target.value })}
                        className='inputEle'
                    />
                    <button onClick={this.handleSearch} >Search</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Posts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.posts.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Home;