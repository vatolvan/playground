using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Weapon : MonoBehaviour
{
    public int rateOfFirePerSeconds;
    public GameObject projectile;

    private float _lastShot;

    void Start()
    {
        _lastShot = Time.time;
    }

    // Update is called once per frame
    public void TriggerWeapon()
    {
        if ((Time.time - _lastShot) * rateOfFirePerSeconds > 1)
        {
            // Debug.Log("Weapon triggered!");
            _lastShot = Time.time;

        }
    }
}
