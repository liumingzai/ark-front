import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

function Account() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">
            <Button animated>
              <Button.Content visible>LogIn</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Account;
