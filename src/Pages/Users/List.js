import React, { useEffect, useContext, useState } from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { Store } from "../../App";
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, query, where, getDocs ,doc, deleteDoc  } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import { Pagination } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const List = () => {
  const { userData } = useContext(Store);
  const [userLists, setuserLists] = useState([]);
  const [fullListofUsers, setfullListofUsers] = useState([]);
  const [confirmationBox, setconfirmationBox] = useState('');
  const [filterUser, setfilterUser] = useState();
  const [filterCount, setfilterCount] = useState();
  const [page, setpage] = useState(1);
  const [searchText, setsearchText] = useState('');
  const [SortList, setSortList] = useState(true);
  const [SortListEmail, setSortListEmail] = useState(true);

  const [modelOpen, setmodelOpen] = useState({open:false,salary:'', dob:''});
  const count = 3
  
  useEffect(() => {
      getUsers();
    },[],
    );
    
    useEffect(() => {

            let newUsers = fullListofUsers.filter(user =>{
              if(!filterUser) {return user}
              return  user.name.includes(filterUser) || user.email.includes(filterUser)
            })
            paginate( newUsers,3, page)
            setfilterCount([...newUsers])
    }, [filterUser])

    

    const getUsers = async () => {
    let users = [];
    try {
      const q = query(
        collection(db, "users"),
        where("createdById", "==", userData?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push({ doc_id: doc.id, ...doc.data() });
      });
      setfullListofUsers(users)
      paginate(users,3,1)
    } catch (err) {
      setuserLists([]);
    }
  };
  
   const deleteUser = async (userData, type) => {
    if (type === "YES") {
      try {
        await deleteDoc(doc(db, "users", userData.empId));
        getUsers();
        setconfirmationBox("");
      } catch (err) {
        console.log("err", err);
      }
    } else {
      setconfirmationBox("");
    }
  }

  const handleClose =()=> {
    setmodelOpen({open: false,salary: "",dob: "",});
  }
  
  const openModal= (userData) => {
    setmodelOpen({open: true,salary: userData.salary,dob: userData.dob,});
  }
  
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  
  const update = debounce(function (e) {
    setfilterUser(e.target.value);
  }, 1000);

  const sort = ()=> {
     setSortList(list => !list)
     setSortListEmail(list => !list)

    }



  const reset = () =>{
    setfilterUser('')
    setsearchText('')
    setSortList(true)
  }

  function paginate( array,page_size = 3, value) {
    setpage(value)
    array.slice((value - 1) * page_size, value * page_size);
     setuserLists([...array.slice((value - 1) * page_size, value * page_size)])
  }


  const Modal = () => {
    return (
      <Dialog
        open={modelOpen.open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="p-1">
            <div className="btn-right">
                <span className="c_pointer" onClick={handleClose}><CancelIcon/></span>
            </div>
          <p>Salery : {modelOpen.salary}</p>
          <p>Dob : {modelOpen.dob}</p>
        </div>
      </Dialog>
    );
  }
  return (
    <Container maxWidth="xl">
      <div className="mt-1 btn-right"> <Link className="common_btn" to="add"> + Add User </Link></div>
      <div className='row'> 
      <input className="form-control w-30"  placeholder='search by name and email' value={searchText} onChange={(e)=>{
         update(e)
         setsearchText(e.target.value)
         }}/>
      <button className='common_btn' onClick={reset}> Reset  </button>
      </div>

      <div className="mt-5">
      { userLists?.length > 0 ?
            <table>
        <tbody>
          <tr>
            <th>
              <div className='row'>
              Name
               <div onClick={sort} className='c_pointer icon' >
                 {
                   SortList ?
                   <ArrowUpwardIcon />
                   :
                   <ArrowDownwardIcon />
                 }
             
              </div>
              </div>
              </th>
            <th>
            <div className='row'>
              Email
            <div onClick={sort} className='c_pointer icon' >
                 {
                   SortListEmail ?
                   <ArrowUpwardIcon />
                   :
                   <ArrowDownwardIcon />
                 }
             
              </div>
              </div>
            </th>
            <th>View</th>
            <th>Action</th>
          </tr>
          {
          userLists
          .sort((a,b) =>{
            if(SortList) { return a.name.localeCompare(b.name)}
            else { return b.name.localeCompare(a.name)}

          }).sort((a,b)=>{
            if(SortListEmail){ return a.email.localeCompare(b.email)}
            else{ return b.email.localeCompare(a.email)}
          })
          .map((user,index) =>
                <tr key={index}>
                <td>{user?.name}</td>
                <td>{user?.email} </td>
                <td className="c_pointer" onClick={()=>openModal(user)}><VisibilityIcon /></td>
                <td className="c_pointer">
                  <DeleteIcon  onClick={()=>setconfirmationBox(user.empId)} />
                  <Link to={`edit/${user.empId}`}> <EditIcon /></Link>
                </td>
    
                { user.empId === confirmationBox && 
                <Dialog
                open={true}
                fullWidth={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <div className="p-1">
                        <p>Are you sure you want delete the user</p>         
                        <div className="mt-1 btn-right">
                            <button className="common_btn" onClick={()=>deleteUser(user,'YES')}>Yes</button>
                            <button className="common_btn" onClick={()=>deleteUser(user,'NO')}>No</button>
                        </div>
                    </div>
                </Dialog>}
              </tr>
           
             )}
        </tbody>
        </table>
        : <p className="text-center"> No record Found</p>
    }
        </div>
      {
        !filterUser &&
        <div className="btn-right">
          <Pagination count={Math.ceil(fullListofUsers.length/count)}  onChange={(e,value)=>{paginate(fullListofUsers,3,value)}}/>
        </div> 
      }
      {
            filterUser && filterCount.length >  Math.ceil(fullListofUsers.length/count) && 
           <div className="btn-right">
           <Pagination count={Math.ceil(filterCount.length/count)}  onChange={(e,value)=>{paginate(filterCount,3,value)}}/>
           </div>
      }
        
      <Modal />
    </Container>
  );
}





export default List