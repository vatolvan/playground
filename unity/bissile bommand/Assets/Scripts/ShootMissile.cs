using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShootMissile : MonoBehaviour
{
    public GameObject missile;

    public float distance = 50f;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("Pressed primary button: " + Input.mousePosition);

            var ray = Camera.main.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast (ray, out var hit))
            {
                //draw invisible ray cast/vector
                // Debug.DrawLine (ray.origin, hit.point);
                //log hit area to the console
                Debug.Log(hit.point);

                var pos = hit.point;
                pos.z = 0;
                Instantiate(missile, pos, Quaternion.Euler(new Vector3(0, 0, 0)));
            }
        }
    }
}
