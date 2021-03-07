package main
 
import (
    "testing" 
)

func TestPingTower(t *testing.T) {
    address := "google.com"
    port := 80

    result, _ := pingTower(address, port)

    if result == false {
        t.Errorf("pingTower failed, expected %v, but got %v", true,  result)
    } else {       
        t.Logf("pingTower succeeded, expected %v, and got %v", result,  result)
    } 
}

func TestPingTowerFail(t *testing.T) {
    // Let's test an address that fails first
    address := "localhost"
    port := 3000

    result, _ := pingTower(address, port)

    if result == true {
        t.Errorf("pingTower failed, expected %v, but got %v", false,  result)
    } else {       
        t.Logf("pingTower succeeded, expected %v, and got %v", result,  result)
    }              
}                  
