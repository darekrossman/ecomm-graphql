import React from "react"
import { Query } from "react-apollo"
import LoadProgress from "./LoadProgress"

export default ({ children, ...props }) => (
  <Query {...props}>
    {({ loading, error, data }) => {
      if (error) {
        return <p>{error.message}</p>
      }

      return (
        <LoadProgress loading={loading}>
          {() => children({ loading, error, data })}
        </LoadProgress>
      )
    }}
  </Query>
)
