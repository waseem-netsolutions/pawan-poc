import axios from 'axios';
class CustomUserQuery {

next(callback) {
    const headers = {
        'Content-Type': 'application/json',
    }
    console.log('fucntion called');
    axios.get("https://jsonplaceholder.typicode.com/users",).then(response => {
        console.log(response.data);
        const error = false;
        const users = [{
            userId: '999',
            profileUrl: 'thumbnail',
            nickname: 'Pawan'
          }]
        callback(users, error);
    });
  }
}

export default () => new CustomUserQuery();