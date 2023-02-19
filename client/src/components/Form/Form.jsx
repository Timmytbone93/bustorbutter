import React, { useState, useEffect, useRef, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import "./Form.css";
import axios from "axios";

function Form() {
  const [form, setForm] = useState({});

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      console.log(`Search value updated to ${searchValue}, component mounted!`);
    } else {
      // do componentDidUpdate logic
      console.log(`Search value updated to ${JSON.stringify(searchValue)}`);
    }
  }, [searchValue]);

  return (
    <div className="Form">
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field></Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Form;
