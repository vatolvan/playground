using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestroyOnEnter : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        // Destroy everything that leaves the trigger
        Destroy(other.gameObject);
    }
}
