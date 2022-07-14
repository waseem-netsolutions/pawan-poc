import { useEffect ,useContext} from "react";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import product10 from "../assets/product-10.jpg";
import product11 from "../assets/product-11.jpg";
import product12 from "../assets/product-12.jpg";
import { Store } from "../App";


 const Home = () => {
  const{ welcomeText, setwelcomeText} = useContext(Store)

  useEffect(() => {
    setTimeout(() => setwelcomeText(false),6000);
  }, []);

  return (
    <>
      <div className="home_banner for_center">
        <Container maxWidth="xl" className="mt-5">
          <h1 className="mt-5"> Contrary to popular belief, Lorem Ipsum is not simply random text.</h1>
          <p className="mt-3">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text
          </p>
          <button className="mt-5 common_btn">Download</button>
        </Container>
      </div>
      <Container maxWidth="xl" className="mt-5">

        <Grid container spacing={2}>
          <Grid className="item_card" item xs={12} md={3}>
            <div> <img src={product10} alt='chairImage' className="w-100" /></div>
          </Grid>

          <Grid className="item_card" item xs={12} md={3}>
            <div> <img src={product11} className="w-100" alt='chairImage' /></div>
          </Grid>

          <Grid className="item_card" item xs={12} md={3}>
            <div> <img src={product12} className="w-100" alt='chairImage' /></div>
          </Grid>

          <Grid className="item_card" item xs={12} md={3}>
            <div> <img src={product10} className="w-100" alt='chairImage'  /></div>
          </Grid>
          
        </Grid>

      </Container>
      <div>
        <div className="modal" style={{display: welcomeText ? 'block':'none'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 >Thanks for Coming</h3>
              </div>
              <div className="modal-body">
                <p>
                We’re so glad you’re here! You are now part of a growing community of Net solutions creating, collaborating,
                and connecting across the globe via Company’s tool.
                </p>
                <button className="mt-1 common_btn" onClick={()=>setwelcomeText(!welcomeText)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default Home