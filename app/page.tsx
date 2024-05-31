import AddBTCForm from "@/components/AddBTCForm";
import UnstakeButton from "@/components/PayBackForm";
import WatcherComponent from "@/components/WatcherComponent";


export default function Home() {
  return (
    <>
    <w3m-button></w3m-button>
    <hr/>
    <AddBTCForm/>
    <hr/>
    <WatcherComponent/>
    <hr/>
    <UnstakeButton/>
    <hr/>
    </>
  );
}

//TODO: 
//TODO: Add a flow where its approval -> AddBTCForm -> Home()
//TODO: Home stats page

// 