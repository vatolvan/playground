using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerControl : MonoBehaviour
{
    public float speed = 1;
    public GameObject weapon;

    private Rigidbody _rigidBody;
    private Camera _mainCamera;
    private Weapon _weaponScript;

    private void Start()
    {
        _weaponScript = weapon.GetComponent<Weapon>();
        _rigidBody = GetComponent<Rigidbody>();
        _mainCamera = Camera.main;
    }

    // Update is called once per frame
    void Update()
    {
        var ray = _mainCamera.ScreenPointToRay(Input.mousePosition);

        if (!Physics.Raycast(ray, out var hit)) return;

        var currentPosition = gameObject.transform.position;

        //draw invisible ray cast/vector
        var directionVector = hit.point - currentPosition;

        RotatePlayer(directionVector);
        MovePlayer();

        if (Input.GetMouseButton(0))
        {
            _weaponScript.TriggerWeapon();
        }
    }

    private void RotatePlayer(Vector3 directionVector)
    {
        // Calculate rotation from player position
        var angle = Vector3.Angle(new Vector3(0, 0, 1), directionVector);
        if (directionVector.x < 0)
        {
            angle = -angle;
        }

        gameObject.transform.rotation = Quaternion.Euler(0, angle, 0);

    }

    void MovePlayer()
    {
        Vector3 direction = new Vector3(0, 0, 0);

        if (Input.GetKey("w"))
        {
            direction.z += 1;
        }

        if (Input.GetKey("a"))
        {
            direction.x += -1;
        }

        if (Input.GetKey("s"))
        {
            direction.z += -1;
        }

        if (Input.GetKey("d"))
        {
            direction.x += 1;
        }

        direction.Normalize();

        _rigidBody.velocity = speed * direction;
    }
}
