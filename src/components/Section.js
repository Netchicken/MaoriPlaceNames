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
              <span className='appheadermeaningtext'>
              {props.Meaning ? props.Meaning : ""}
            </span>
          </div>
        </div>
        <div className='col'>
          <div className='appheadercontainer'>
            Hint: The Components are {props.Components ? props.Components : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section;
