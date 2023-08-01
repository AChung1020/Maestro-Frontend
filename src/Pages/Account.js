import React, { useEffect, useState } from 'react';
import Pool from '../server-AWS/UserPool';

const YourComponent = () => {
  const [userAttributes, setUserAttributes] = useState(null);

  useEffect(() => {
    // Function to retrieve user attributes
    const getUserAttributes = () => {
      const cognitoUser = Pool.getCurrentUser();

      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.error('Error getting user session:', err);
            return;
          }

          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error getting user attributes:', err);
              return;
            }

            // Format the attributes into a key-value object
            const formattedAttributes = {};
            attributes.forEach(attribute => {
              formattedAttributes[attribute.getName()] = attribute.getValue();
            });

            setUserAttributes(formattedAttributes);
          });
        });
      }
    };

    getUserAttributes();
  }, []);

  return (
    <div>
      {userAttributes ? (
        <div>
          {Object.keys(userAttributes).map(attributeName => {
            // Exclude specific attributes from being displayed
            if (attributeName !== 'phone_number_verified' && attributeName !== 'sub' && attributeName !== 'email_verified') {
              return (
                <p key={attributeName}>
                  {attributeName}: {userAttributes[attributeName]}
                </p>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>Loading user attributes...</p>
      )}
    </div>
  );
};

export default YourComponent;
