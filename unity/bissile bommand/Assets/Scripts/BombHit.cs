using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using UnityEngine;

public class BombHit : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("Start");
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Bomb"))
        {
            Debug.Log("Bomb hit " + this);
            Destroy(gameObject);
        }

    }
}
