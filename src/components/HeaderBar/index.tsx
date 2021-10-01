import React, { MouseEventHandler } from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { MdMenu } from 'react-icons/md'

interface HeaderBarProps {
  buttonMenuClick?: MouseEventHandler<HTMLButtonElement>
  title?: string
}

export default function HeaderBar({ buttonMenuClick, title }: HeaderBarProps) {
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={buttonMenuClick}
        >
          <MdMenu />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
