class CustomUserPaginatedQuery {
    constructor() {
        // Required public property to determine if more data is available.
        this.hasNext = false;
    }

    // Required public property.
    next(callback) {
        // Make async call and get list of users
        // const [users, error] = myAsyncCallToGenerateMembers();
        // Set this.hasNext
        // this.hasNext = setTrueIfMoreMembersCanBeFetched();
        console.log('i am in');
        let users = [{
            nickname:"nickname",
            userId:"Pawan99",


        }]
        let error = ''
        callback(users, error);
    }
}

const CustomUserPaginatedQueryFactory = () => new CustomUserPaginatedQuery();
export default  CustomUserPaginatedQueryFactory