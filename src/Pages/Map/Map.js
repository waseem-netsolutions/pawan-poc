import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 import { useEffect ,useContext} from 'react';
 import { Link } from 'react-router-dom';
import { collection, query, where, getDocs   } from "firebase/firestore";
import { db } from '../../firebase';
import { Store } from '../../App';
import { useState } from 'react';
import { Container } from '@mui/material';
import icon from '../../assets/yellowIcon.png'


const Maps = (props) => {
  const { userData } = useContext(Store);
  const [markers, setmarkers] = useState([]);
  const [activeMark, setactiveMark] = useState({});




    useEffect(()=>{
        getLocations()
    },[])

    const getLocations = async () => {
        let markers = [];
        try {
          const q = query(
            collection(db, "locations"),
            where("createdById", "==", userData?.uid)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
              markers.push({ doc_id: doc.id, ...doc.data() });
            });
            setmarkers(markers)
            console.log(markers)
        } catch (err) {
            console.log('erroe','----------------');

          setmarkers([]);
        }
      };
  

    const setmarkersActive = (marker) => {
      console.log(marker);
      setactiveMark(marker);

    }

    return (
      <Container maxWidth="xl">
      <div className="m-1 btn-right ">
        <Link className="common_btn" to="/dashboard/map/add">
          Add Location
        </Link>
      </div>
      <div className="row">
        <div className="col-4">
          {/* <img src={product12} />
          {product12} */}

            <ul class="list-group">
             {markers?.map(marker =>{
               let active = activeMark.doc_id === marker.doc_id ? 'active' :''
                return(
                  <li class={`list-group-item c_pointer ${active}`} onClick={()=>setmarkersActive(marker)}>{marker?.name} - {marker?.address} </li>
                )
             }
            )}
          </ul>
     

        </div>
        <div className="col-8">
          <Map
            google={props.google}
            zoom={activeMark.name ? 10 :2}
            style={{
              maxWidth: "800px",
              position:'absolute'
            }}
            initialCenter={{
              lat: activeMark?.location?.lat ?? '',
              lng: activeMark?.location?.long ?? ''
            }}
            center={{
              lat: activeMark?.location?.lat ?? '',
              lng: activeMark?.location?.long ?? ''
            }}
          >
            {markers.map((marker) => (
              <Marker
                key={marker?.doc_id}
                title={marker?.name}
                position={{
                  lat: marker?.location?.lat,
                  lng: marker?.location?.long,
                }}
                onClick={()=>setmarkersActive(marker)}
                icon={activeMark.doc_id === marker.doc_id ? icon : ''}

              />
            ))}
          </Map>
        </div>
      </div>
    </Container>
    );
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDX3K1ga3Py-ewivTAredNycN76u0nZ4Ds')
})(Maps)