using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ShootMissile : MonoBehaviour
{
    public GameObject missile;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            var ray = Camera.main.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast (ray, out var hit))
            {
                //draw invisible ray cast/vector
                var pos = hit.point;
                var missileObject = Instantiate(missile, gameObject.transform.position, Quaternion.identity);
                Missile missileScript = missileObject.GetComponent<Missile>();
                missileScript.targetX = pos.x;
                missileScript.targetY = pos.y;
            }
        }
    }
}
