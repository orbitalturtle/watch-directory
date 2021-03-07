package main

import (
    "fmt"
    "net"
    "strconv"
    "time"
)

// go routine for checking if a tower responds to a request or not
func pingTower(address string, port int) (bool, error) {
    timeOut := time.Duration(5) * time.Second

    _, err := net.DialTimeout("tcp", address+":"+strconv.Itoa(port), timeOut)
    if err != nil {
       return false, nil
    } 

    return true, nil
}
