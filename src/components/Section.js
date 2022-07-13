const Section = ({ props }) => {
  return (
    <div>
      <div className='row'>
        <div className='col'>
          <div className='appheadercitytext'>
            The city is {props.CapitalName ? props.CapitalName : ""} (only
            showing for debugging)
          </div>
        </div>
        <div className='col'>
          <div className='appheadercontainer'>
            The Country is {props.CountryName ? props.CountryName : ""}
          </div>
        </div>
        <div className='col'>
          <div className='appheadercontainer'>
            The Continent is {props.ContinentName ? props.ContinentName : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Section;
