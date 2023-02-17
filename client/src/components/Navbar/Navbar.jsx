import React, {useState} from 'react'
import { Menu } from 'semantic-ui-react'




function Navbar() {

    const [activeItem,setActiveItem] = useState()

    return (
      <div className="Navbar">
          <Menu>
          <Menu.Item
            name='editorials'
            active={activeItem === 'editorials'}
            onClick={(e,{name})=>{
                
                console.log(name)
                setActiveItem(name)}

            }
          >
            Editorials
          </Menu.Item>
  
          <Menu.Item
            name='reviews'
            active={activeItem === 'reviews'}
            onClick={(e,{name})=>{
                
                console.log(name)
                setActiveItem(name)}

            }
          >
            Reviews
          </Menu.Item>
  
          <Menu.Item
            name='upcomingEvents'
            active={activeItem === 'upcomingEvents'}
            onClick={(e,{name})=>{
                
                console.log(name)
                setActiveItem(name)}

            }
          >
            Upcoming Events
          </Menu.Item>
        </Menu>
    
    
      </div>
    )
  }

  export default Navbar

