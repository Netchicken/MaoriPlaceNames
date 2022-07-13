const Section = ({ props }) => {
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <div className='appheadercitytext'>
            The Place Name is {props.Placename ? props.Placename : ""} (only
            showing for debugging)
          </div>
        </div>
        <div className='col'>
          <div className='appheadercontainer'>
            The Meaning is {props.Meaning ? props.Meaning : ""}
          </div>
        </div>
        <div className='col'>
          <div className='appheadercontainer'>
            The Components are <span className=''>{props.Components ? props.Components : ""}</span> 
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section;
